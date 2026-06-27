import express from "express";
import * as otherController from "../controllers/other.controller.js";

const router = express.Router();

router.post("/redeem", otherController.redeemCoupon);

export default router;