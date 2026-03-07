import TripModel from "@/models/trip.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        console.log("Task submission is hitting");
        const body = await req.json();
        console.log("Body: ", body);
        const trip = await TripModel.findById(body.tripId);
        if (!trip) {
            return NextResponse.json({ message: "Trip not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Task submitted successfully" });
    } catch (error) {
        console.error("Error submitting task:", error);
        return NextResponse.json({ message: "Error submitting task" }, { status: 500 });
    }
}