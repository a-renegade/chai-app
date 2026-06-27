import reviewModel from "../models/reviewModel.js";
import shopModel from "../models/shopModel.js";
import userModel from "../models/userModel.js";

const createReview = async (req, res) => {
  try {
    const reqBody = req.body;

    const existingReview = await reviewModel.findOne({
      email: reqBody.email,
      shop: reqBody.shop
    });

    if (existingReview) {
      return res
        .status(400)
        .send({ message: "You have already reviewed this shop" });
    }

    const review = {
      email: reqBody.email,
      name: reqBody.name,
      description: reqBody.description,
      rating: reqBody.rating,
      shop: reqBody.shop
    };

    const ret = await reviewModel.create(review);

    const shop = await shopModel.findById(reqBody.shop);

    const rewardPoints = shop.totalRatings === 0 ? 15 : 10;

    const totalRatings = shop.totalRatings + 1;
    const averageRating =
      (shop.averageRating * shop.totalRatings + reqBody.rating) / totalRatings;

    shop.totalRatings = totalRatings;
    shop.averageRating = averageRating;

    await shop.save();

    res.status(201).send(ret);

    userModel
      .findOneAndUpdate(
        { email: reqBody.email },
        { $inc: { points: rewardPoints } }
      )
      .catch((err) => {
        console.error("Failed to award review points:", err);
      });

  } catch (err) {
    console.log("Error while creating review", err);
    res.status(500).send({ message: "Error while creating review" });
  }
};

const getReviewsByShop = async (req, res) => {
  try {
    const reviews = await reviewModel.find({ shop: req.params.shopId });

    res.status(200).send(reviews);
  } catch (err) {
    console.log("Error while fetching reviews", err);
    res.status(500).send({ message: "Error while fetching reviews" });
  }
};

const updateReview = async (req, res) => {
  try {
    const { email, shop, description, rating } = req.body;

    const review = await reviewModel.findOne({ email, shop });

    if (!review) {
      return res.status(404).send({ message: "Review not found" });
    }

    const shopDoc = await shopModel.findById(shop);

    shopDoc.averageRating =
      (shopDoc.averageRating * shopDoc.totalRatings - review.rating + rating) /
      shopDoc.totalRatings;

    review.description = description;
    review.rating = rating;

    await review.save();
    await shopDoc.save();

    res.status(200).send(review);
  } catch (err) {
    console.log("Error while updating review", err);
    res.status(500).send({ message: "Error while updating review" });
  }
};



export {
  createReview,
  getReviewsByShop,
  updateReview
};