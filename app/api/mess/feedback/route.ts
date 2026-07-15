import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import FeedbackModel from "@/models/feedback.model";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        // Parse the incoming multipart/form-data request
        const formData = await req.formData();
        
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;
        const imageFile = formData.get("image"); // This will be the File object if provided

        console.log("Feedback data received:", { subject, message, hasImage: !!imageFile });

        // Note: For now, we are saving only text data. To save the image, 
        // you would typically upload `imageFile` to an S3 bucket or Cloudinary and save the URL here.
        const createFeedback = await FeedbackModel.create({
            subject,
            message,
        });

        return NextResponse.json(
            {
                success: true, 
                message: "Feedback saved successfully",
                data: createFeedback
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Error saving feedback:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
