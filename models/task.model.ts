import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, "Topic is required"],
    },
    status: {
        type: String,
        enum: ["pending", "done", "raise"],
        default: "pending",
    },
    submittedAt: {
        type: String,
        default: "",
    },
    firstImageUrl: {
        type: String,
        default: "",
    },
    secondImageUrl: {
        type: String,
        default: "",
    },

})

const daySchema = new mongoose.Schema({
    date: {
        type: Date,
    },
    month: {
        type: String,
    },
    tasks: [taskSchema],
})


const TaskModel = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default TaskModel;