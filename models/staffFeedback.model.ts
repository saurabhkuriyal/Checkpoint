import mongoose from "mongoose";

const staffFeedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    batchNumber: {
        type: String,
        required: false,
    },
    staffName: {
        type: String,
        required: true,
    },
    ratingBehaviour: {
        type: Number,
        required: true,
    },
    ratingHygiene: {
        type: Number,
        required: true,
    },
    ratingSpeed: {
        type: Number,
        required: true,
    },
    ratingCleanliness: {
        type: Number,
        required: true,
    },
    ratingOverall: {
        type: Number,
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

const StaffFeedbackModel = mongoose.models.StaffFeedback || mongoose.model("StaffFeedback", staffFeedbackSchema);

export default StaffFeedbackModel;
