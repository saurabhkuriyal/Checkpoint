import TripModel from "@/models/trip.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        console.log("Task submission is hitting");
        const tripId = req.nextUrl.searchParams.get('tripId');
        console.log("trip", tripId);

        const body = await req.json();
        console.log("Body: ", body);

        const taskId = body._id;
        console.log("task id", taskId);

        const trip = await TripModel.findById(tripId);

        //console.log("trip", trip);

        if (!trip) {
            return NextResponse.json({ message: "Trip not found" }, { status: 404 });
        }

        for (let i: number = 0; i < trip.groups.length; i++) {
            console.log("is it running or not");

            for (let j: number = 0; j < trip.groups[i].tasks.length; j++) {
                console.log("is it running or not in loop 2 ");
                if (trip.groups[i].tasks[j]._id == taskId) {
                    console.log("----->", trip.groups[i].tasks[j]);

                }
            }
        }

        return NextResponse.json({ message: "Task submitted successfully" });
    } catch (error) {
        console.error("Error submitting task:", error);
        return NextResponse.json({ message: "Error submitting task" }, { status: 500 });
    }
}