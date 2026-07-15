import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import FeedbackModel from "@/models/feedback.model";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const data = await req.json();
        console.log("Feedback data received:", data);

        const createFeedback = await FeedbackModel.create(data);

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
