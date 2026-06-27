import shopModel from "../models/shopModel.js";

const createShop = async (req, res) => {
  try {
    const reqBody = req.body;

    const shop = {
      name: reqBody.name,
      address: reqBody.address,
      description: reqBody.description,
      latitude: reqBody.latitude,
      longitude: reqBody.longitude
    };

    const ret = await shopModel.create(shop);

    res.status(201).send(ret);
  } catch (err) {
    console.log("Error while creating shop", err);
    res.status(500).send({ message: "Error while creating shop" });
  }
};

const getShops = async (req, res) => {
  try {
    const shops = await shopModel.find();

    res.status(200).send(shops);
  } catch (err) {
    console.log("Error while fetching shops", err);
    res.status(500).send({ message: "Error while fetching shops" });
  }
};

const getShopById = async (req, res) => {
  try {
    const shop = await shopModel.findById(req.params.id);

    if (!shop) {
      return res.status(404).send({ message: "Shop not found" });
    }

    res.status(200).send(shop);
  } catch (err) {
    console.log("Error while fetching shop", err);
    res.status(500).send({ message: "Error while fetching shop" });
  }
};

export { createShop, getShops, getShopById };