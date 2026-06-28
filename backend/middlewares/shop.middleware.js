const checkCreateShopBody = (req, res, next) => {
  const {
    name,
    address,
    description,
    latitude,
    longitude,
  } = req.body;

  if (
    !name ||
    !address ||
    !description ||
    latitude === undefined ||
    longitude === undefined
  ) {
    return res.status(400).json({
      message: "Missing required shop details",
    });
  }

  next();
};



const checkGetShopByIdParams = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Shop id is required",
    });
  }

  next();
};

export {
  checkCreateShopBody,
  checkGetShopByIdParams,
};