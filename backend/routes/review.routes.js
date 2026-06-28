import express from "express";
import * as reviewController from "../controllers/review.controller.js";
import {
  checkCreateReviewBody,
  checkGetReviewsByShopParams,
  checkUpdateReviewBody,
} from "../middlewares/review.middleware.js";
import { checkToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", [checkToken, checkCreateReviewBody], reviewController.createReview);
router.get("/:shopId", [checkGetReviewsByShopParams], reviewController.getReviewsByShop);
router.put("/", [checkToken, checkUpdateReviewBody], reviewController.updateReview);

export default router;