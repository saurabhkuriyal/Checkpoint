import TaskModel from "@/models/task.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        console.log("Task Creation is running");

        const body = await req.json();
        const { data } = body;
        const { formattedDate, monthName } = data;


        const checkTask = await TaskModel.findOne({ formattedDate: formattedDate, });

        if (checkTask) {
            return NextResponse.json({ message: "Task already exists" });
        }

        const newTask = new TaskModel({ formattedDate: formattedDate, monthName: monthName });
        const createT = await newTask.save();
        console.log("Task created", createT);

        return NextResponse.json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        console.log("error in ", error);

    }
}