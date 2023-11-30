const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
   discount: {
    type: Number,
    default:0,
  },
  brand: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  compatible: {
    type: String,
  },
  favorites: {
    type: Array,
  },
  calification: {
    type: Array,
  },
  coments: {
    type: Array,
  },
  categories: {
    type: Array,
    required: true,
  },
  promedio: {
    type: Number,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  orders: {
    type: Array,
  },
});

const ProductsModel = mongoose.model("products", ProductsSchema);

module.exports = ProductsModel;
