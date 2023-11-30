const controllers = {};
// const connection = require("../DB_connect/connect");
const ProductsModel = require("../models/Product");
const UserModel = require("../models/Users");
const CartModel = require("../models/Cart");

controllers.index = async (req, res) => {
  try {
    const allProducts = await ProductsModel.find();
    const allUsers = await UserModel.find();
    const allCart = await CartModel.find();
    res.send({ allProducts, allUsers, allCart });
  } catch (error) {
    console.log(error);
  }
};

module.exports = controllers;
