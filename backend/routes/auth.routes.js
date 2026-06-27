import express from "express";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signin", authController.signIn);
router.post("/profile", authController.getProfile);
router.get("/check", authController.authCheck);
router.post("/logout", authController.logout);

export default router;