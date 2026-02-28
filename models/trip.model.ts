import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    time: {
        type: String,
        required: [true, "Time is required"],
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
    remarks: {
        type: String,
        default: "",
    },
    submittedAt: {
        type: String,
        default: "",
    },

})

const daysSchema = new mongoose.Schema({
    date: {
        type: String,
        required: [true, "Date is required"],
    },
    tasks: [taskSchema],
})



const tripSchema = new mongoose.Schema({
    tripName: {
        type: String,
        required: [true, "Name is required"],
    },
    TripCoordinatorId: {
        type: "String",
        required: [true, "Who will be the coordinator"],
    },
    Duration: {
        type: String,
        required: [true, "Duration is mendatory"]
    },
    days: [daysSchema],
})

const TripModel = mongoose.models.Trip || mongoose.model("Trip", tripSchema);

export default TripModel;