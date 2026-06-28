import express from "express";
import * as otherController from "../controllers/other.controller.js";
import { checkToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/redeem", [checkToken], otherController.redeemCoupon);

export default router;