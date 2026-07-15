import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const FeedbackModel = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export default FeedbackModel;
