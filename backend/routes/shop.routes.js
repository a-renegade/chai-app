import express from "express";
import * as shopController from "../controllers/shop.controller.js";
import {
  checkCreateShopBody,
  checkGetShopByIdParams,
} from "../middlewares/shop.middleware.js";
import { checkToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", [checkToken, checkCreateShopBody], shopController.createShop);
router.get("/", shopController.getShops);
router.get("/:id", [checkGetShopByIdParams], shopController.getShopById);

export default router;