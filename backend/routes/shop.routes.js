import express from "express";
import * as shopController from "../controllers/shop.controller.js";

const router = express.Router();

router.post("/", shopController.createShop);
router.get("/", shopController.getShops);
router.get("/:id", shopController.getShopById);

export default router;