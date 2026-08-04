import RecciModel from "@/models/recci.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const recciData = await request.json();
        //console.log("Saving RECCI data:", recciData);

        const newRecci = new RecciModel(recciData);
        await newRecci.save();

        return NextResponse.json({ success: true, message: "RECCI Tour saved successfully!" });
    } catch (error) {
        console.error("API Error saving RECCI:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
