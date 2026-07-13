import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import ConsumptionModel from "@/models/consumption.model";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const data = await req.json();

        const createConsumption = await ConsumptionModel.create(data);

        return NextResponse.json(
            { success: true, message: "Consumption data saved successfully", data: createConsumption },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Error saving consumption data:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
