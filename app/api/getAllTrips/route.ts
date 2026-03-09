import TripModel from "@/models/trip.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        console.log("Getting all trips");
        const trips = await TripModel.find();
        return NextResponse.json(trips);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching trips" }, { status: 500 });
    }
}