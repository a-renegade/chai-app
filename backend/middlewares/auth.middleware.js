import jwt from "jsonwebtoken";
import "dotenv/config";

const checkSignInBody = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  next();
};


const checkToken = (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET);

    // Overwrite client-provided email with authenticated user's email
    req.body.email = tokenData.userEmail;

    next();
  } catch (err) {
    console.log("Invalid token:", err.message);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export { checkSignInBody, checkToken };