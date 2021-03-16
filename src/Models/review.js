import mongoose from "mongoose";

const { Schema } = mongoose;
const ReviewSchema = new Schema({
    messageBody: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
    },
    apartmentId: {
        type: Schema.Types.ObjectId,
        ref: "Apartment",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    helpful: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Review = mongoose.model("Review", ReviewSchema);

export default Review;