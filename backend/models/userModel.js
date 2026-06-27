import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      default: "USER",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minLength: 3
    },
    userType: {
      type: String,
      default: "USER",
      enum: ["ADMIN", "USER"]
    },
    points: {
      type: Number,
      default: 0
    },
    coupons: {
      type: [String],
      default: []
    }
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);
export default User;