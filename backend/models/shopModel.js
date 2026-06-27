import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: ""
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED"],
      default: "PENDING"
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      set: (value) => Math.round(value * 10) / 10
    },
    totalRatings: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  { timestamps: true, versionKey: false }
);

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;