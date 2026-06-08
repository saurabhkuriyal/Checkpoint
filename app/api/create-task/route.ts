import TaskModel from "@/models/task.model";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { data } = body;
        const { formattedDate, monthName } = data;

        console.log("formatted date and month are ", formattedDate, monthName);

        const checkTask = await TaskModel.findOne({ date: formattedDate });

        if (checkTask) {
            return NextResponse.json({ message: "Task already exists" });
        }

        const newTask = new TaskModel({ date: formattedDate, month: monthName });
        const createT = await newTask.save();
        console.log("Task created", createT);

        return NextResponse.json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        console.log("error in ", error);

    }
}