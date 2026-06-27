import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userModel from "./models/userModel.js"

import authRoutes from "./routes/auth.routes.js";
import shopRoutes from "./routes/shop.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import otherRoutes from "./routes/other.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "Chai Shop API is running",
  });
});

app.use("/chaiShop/api/auth", authRoutes);
app.use("/chaiShop/api/shop", shopRoutes);
app.use("/chaiShop/api/review", reviewRoutes);
app.use("/chaiShop/api/other", otherRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");
    init();
    app.listen(process.env.PORT, () => {
      console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("SERVER STARTUP FAILED");
    console.error(err);
    process.exit(1);
  }
}


async function init() {
  try {
    const user = await userModel.findOne({ email: process.env.ADMIN_ID });

    if (user) {
      console.log("ADMIN IS ALREADY PRESENT ->", user.fullName);
      return;
    }
  } catch (err) {
    console.log(err, "ERROR OCCURRED WHILE CHECKING ADMIN");
  }

  try {
    await userModel.create({
      fullName: "Abhishek Yadav",
      password: process.env.ADMIN_PASSWORD,
      email: "abhishek908489@gmail.com", 
      userType: "ADMIN",
    });

    const user = await userModel.findOne({ email: "abhishek908489@gmail.com" });
    console.log("ADMIN CREATED", user);
  } catch (err) {
    console.log(err, "ERROR OCCURRED WHILE CREATING ADMIN");
  }
}
startServer();