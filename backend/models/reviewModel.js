import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    
    description: {
      type: String,
      default: ""
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;