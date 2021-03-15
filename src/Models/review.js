import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
    body: {
        type: String,
        required: false,
    },
    rating: {
        type: String,
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