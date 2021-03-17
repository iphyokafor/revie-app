import createError from "http-errors";
import Apartment from "../Models/apartment";

export default class apartmentController {
    static async postApartment(request, response, next) {
        try {
            const {
                address,
                amenities,
                apartmentType,
                apartmentCategory,
            } = request.body;

            const apartment = await new Apartment({
                address,
                amenities,
                photo: request.files.photo.name,
                video: request.files.video.name,
                apartmentType,
                apartmentCategory,
            });
            console.log(apartment);
            const savedData = await apartment.save();
            return response.status(201).json({
                message: "Apartment details added successfully",
                savedData,
            });
        } catch (error) {
            next(error);
            console.log("error", error);
        }
    }

    static async getApartment(request, response, next) {
        try {
            let { page, limit } = request.query;
            page = page < 1 ? 1 : page;
            limit = 5;

            // get total documents in the Apartment collection
            const count = await Apartment.countDocuments();
            // eslint-disable-next-line prefer-const
            let totalPages = Math.ceil(count / limit);
            page = page > totalPages ? totalPages : page;

            const apartment = await Apartment.find({ __v: 0 })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .populate("reviews")
                .collation({ locale: "en" })
                .sort({ createdAt: -1 })
                .exec();

            // return response with apartment, total pages, and current page
            response.status(201).json({
                message: "All apartments",
                apartment,
                // eslint-disable-next-line object-shorthand
                totalPages: totalPages,
                currentPage: page,
                totalProducts: count,
            });
        } catch (error) {
            next(error);
            console.log("error", error);
        }
    }
}