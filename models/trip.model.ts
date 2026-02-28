import mongoose from "mongoose";

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


})