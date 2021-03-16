import createError from "http-errors";
import Apartment from "../Models/apartment";
import Review from "../Models/review";

export default class reviewController {
    static async postReview(request, response, next) {
        try {
            // eslint-disable-next-line object-curly-newline
            const { messageBody, rating, helpful, userId } = request.body;

            const review = await new Review({
                messageBody,
                rating,
                helpful,
                apartmentId: request.params.apartmentId,
                userId: request.decoded._id,
            });
            console.log(review);
            await Apartment.updateOne({ $push: { reviews: review._id } });
            const savedReview = await review.save();
            return response.status(201).json({
                message: "Successfully added Review",
                savedReview,
            });
        } catch (error) {
            next(error);
            console.log("error", error);
        }
    }
}