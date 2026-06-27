import express from "express";
import * as reviewController from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", reviewController.createReview);
router.get("/:shopId", reviewController.getReviewsByShop);
router.put("/", reviewController.updateReview);

export default router;