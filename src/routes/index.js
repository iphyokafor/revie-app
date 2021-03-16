import { Router } from "express";
import userRoute from "./user";
import apartmentRoute from "./apartment";
import reviewRoute from "./review";

const router = new Router();

router.use("/v1", userRoute);
router.use("/v1", apartmentRoute);
router.use("/v1", reviewRoute);

export default router;