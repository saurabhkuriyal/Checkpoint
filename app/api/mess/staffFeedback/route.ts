import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import StaffFeedbackModel from "@/models/staffFeedback.model";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        // Parse incoming multipart/form-data request
        const formData = await req.formData();

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const number = formData.get("number") as string;
        const batchNumber = (formData.get("batchNumber") as string) || "";
        const staffName = formData.get("staffName") as string;
        const ratingBehaviour = Number(formData.get("ratingBehaviour"));
        const ratingHygiene = Number(formData.get("ratingHygiene"));
        const ratingSpeed = Number(formData.get("ratingSpeed"));
        const ratingCleanliness = Number(formData.get("ratingCleanliness"));
        const ratingOverall = Number(formData.get("ratingOverall"));
        const message = formData.get("message") as string;
        const imageFile = formData.get("image") as File;

        console.log("Staff Feedback data received:", { name, email, staffName, hasImage: !!imageFile });

        let imageURL: string = "";

        if (imageFile && imageFile instanceof File && imageFile.size > 0) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "task-manager-staff-feedback",
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else if (!result) reject(new Error("No result from Cloudinary"));
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });

            imageURL = uploadResponse.secure_url;
        }

        const createStaffFeedback = await StaffFeedbackModel.create({
            name,
            email,
            number,
            batchNumber,
            staffName,
            ratingBehaviour,
            ratingHygiene,
            ratingSpeed,
            ratingCleanliness,
            ratingOverall,
            message,
            image: imageURL,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Staff feedback saved successfully",
                data: createStaffFeedback,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error saving staff feedback:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const feedbacks = await StaffFeedbackModel.find().sort({ createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                message: "Staff feedback retrieved successfully",
                data: feedbacks,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching staff feedback:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
