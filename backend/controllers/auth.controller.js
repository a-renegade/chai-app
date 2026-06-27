import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import generateToken from "../lib/jwt.js";
import "dotenv/config.js";

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        email,
        password
      });
    } else if (user.password !== password) {
      return res.status(401).send({ message: "Wrong password" });
    }

    const userData = {
      userReferenceId: user._id,
      fullName: user.fullName,
      userEmail: user.email,
      userType: user.userType
    };

    generateToken(userData, res);

    res.status(200).send(userData);
  } catch (err) {
    console.log("Error occurred while signing in", err);
    res.status(500).send({ message: "Error occurred while signing in" });
  }
};

const authCheck = async (req, res) => {
  try {
    const token = req.cookies?.jwt;

    const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(tokenDetails)
    res.status(200).send(tokenDetails);
  } catch (err) {
    console.log("Not a valid token", err.message);
    res.status(401).send({ message: "Not a valid token" });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 0
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log("Error in logout controller", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getProfile = async (req, res) => {
  try {
    // console.log(req.body)
    const { email } = req.body;

    const user = await userModel.findOne(
      { email },
      "fullName email points coupons"
    );

    if (!user) {
      return res.status(404).send({
        message: "User not found"
      });
    }

    res.status(200).send(user);
  } catch (err) {
    console.log("Error while fetching profile", err);
    res.status(500).send({
      message: "Error while fetching profile"
    });
  }
};

export { signIn, authCheck, logout ,getProfile };