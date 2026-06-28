import express from "express";
import * as authController from "../controllers/auth.controller.js";
import {
  checkSignInBody,
  checkToken,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signin", [checkSignInBody], authController.signIn);
router.post("/profile", [checkToken], authController.getProfile);
router.get("/check", authController.authCheck);
router.post("/logout", authController.logout);

export default router;