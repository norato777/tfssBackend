const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  product_ids: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  ],
});

const CartModel = mongoose.model("cart", CartSchema);

module.exports = CartModel;
