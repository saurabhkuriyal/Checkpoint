import TaskModel from "@/models/task.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const tasks = await TaskModel.find();
        return NextResponse.json({ message: "Tasks fetched successfully", status: 200, tasks });
    } catch (error) {
        console.log("error in getting task", error);
    }
}