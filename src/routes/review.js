import { Router } from "express";
import reviewController from "../controllers/reviews";
import verifyToken from "../middlewares/verify-token";

const { postReview } = reviewController;

const router = new Router();

router.post("/review/:apartmentId", verifyToken, postReview);

export default router;