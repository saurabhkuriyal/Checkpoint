import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: [true, "Topic is required"],
    },
    time: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "done", "raise"],
        default: "pending",
    },
    userRemark: {
        type: String,
        default: "",
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
    groupId: {
        type: String,
    },
    date: {
        type: Date,
    },
    tasks: [taskSchema],
})

const monthSchema = new mongoose.Schema({
    month: {
        type: String,
    },
    days: [daySchema],
})

const TaskModel = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default TaskModel;