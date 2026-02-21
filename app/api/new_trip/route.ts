import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        console.log("new_trip is hitting");

        const { tripName, tripDate, tasks } = await request.json();
        console.log("Received Trip:", { tripName, tripDate, tasks });
        return NextResponse.json({ success: true, message: "Trip created successfully" });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
