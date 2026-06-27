import userModel from "../models/userModel.js";

const redeemCoupon = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.points < 50) {
      return res.status(400).send({
        message: "You need at least 50 points to redeem a coupon."
      });
    }

    const couponCode =
      "CHAI-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    user.points -= 50;
    user.coupons.push(couponCode);

    await user.save();

    res.status(200).send({
      message: "Coupon redeemed successfully.",
      coupon: couponCode,
      remainingPoints: user.points
    });
  } catch (err) {
    console.log("Error while redeeming coupon", err);
    res.status(500).send({
      message: "Error while redeeming coupon"
    });
  }
};

export { redeemCoupon };