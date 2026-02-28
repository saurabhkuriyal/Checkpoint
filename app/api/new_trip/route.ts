import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        console.log("new_trip is hitting");
        await connectDB();

        const { tripName, tripDate, tripDiscussion, groups } = await request.json();
        console.log("Received Trip:", { tripName, tripDate, tripDiscussion, groups });
        return NextResponse.json({ success: true, message: "Trip created successfully" });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
