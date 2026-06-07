import TaskModel from "@/models/task.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        console.log("Task Creation is running");

        const formData = await req.json();
        console.log("Data", formData);
    } catch (error) {
        console.log("error in ", error);

    }
}