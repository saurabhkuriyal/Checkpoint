import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // 1. Get the form data from the request
        const formData = await request.formData();

        // 2. Extract text fields
        const driverName = formData.get("driverName") as string;
        const driverNumber = formData.get("driverNumber") as string;
        const busNumber = formData.get("busNumber") as string;

        // 3. Extract approval statuses (sent as strings from frontend)
        const driverPhotoApproved = formData.get("driverPhotoApproved") === "true";
        const busFrontPhotoApproved = formData.get("busFrontPhotoApproved") === "true";

        // 4. Extract Files
        const driverPhoto = formData.get("driverPhoto") as File | null;
        const busFrontPhoto = formData.get("busFrontPhoto") as File | null;

        // 5. Extract multiple seat photos and their statuses
        // Note: If you sent them as seatPhoto_0, seatPhoto_0_approved etc.
        const seatPhotos = [];
        let index = 0;
        while (formData.has(`seatPhoto_${index}`)) {
            const file = formData.get(`seatPhoto_${index}`) as File;
            const approved = formData.get(`seatPhoto_${index}_approved`) === "true";
            seatPhotos.push({ file, approved });
            index++;
        }

        // Logic: Here you would typically:
        // - Upload files to S3, Cloudinary, or local storage
        // - Save metadata (names, numbers, approval statuses, and file URLs) to a Database (Prisma/MongoDB/Postgres)

        console.log("Received Request:", {
            driverName,
            driverNumber,
            busNumber,
            driverPhotoApproved,
            busFrontPhotoApproved,
            seatPhotosCount: seatPhotos.length,
            filesNames: {
                driver: driverPhoto?.name,
                bus: busFrontPhoto?.name
            }
        });

        // 6. Return Success Response
        return NextResponse.json({
            success: true,
            message: "Inspection report received successfully",
            receivedData: {
                driverName,
                busNumber,
                totalSeats: seatPhotos.length
            }
        }, { status: 201 });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 });
    }
}
