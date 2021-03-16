import { Router } from "express";
import apartmentController from "../controllers/apartment";

const fileUpload = require("express-fileupload");

const { postApartment, getApartment } = apartmentController;

const router = new Router();

router.post(
    "/apartment",
    fileUpload({ useTempFiles: true, limits: { fileSize: 50 * 1024 * 1024 } }),
    postApartment
);
router.get("/apartment", getApartment);

export default router;