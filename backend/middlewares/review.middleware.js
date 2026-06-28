const checkCreateReviewBody = (req, res, next) => {
  const { email, name, description, rating, shop } = req.body;

  if (!email || !name || !description || rating === undefined || !shop) {
    return res.status(400).json({
      message: "Missing required review details",
    });
  }

  next();
};

const checkGetReviewsByShopParams = (req, res, next) => {
  const { shopId } = req.params;

  if (!shopId) {
    return res.status(400).json({
      message: "Shop id is required",
    });
  }

  next();
};

const checkUpdateReviewBody = (req, res, next) => {
  const { email, shop, description, rating } = req.body;

  if (!email || !shop || !description || rating === undefined) {
    return res.status(400).json({
      message: "Missing required review details",
    });
  }

  next();
};

export {
  checkCreateReviewBody,
  checkGetReviewsByShopParams,
  checkUpdateReviewBody,
};