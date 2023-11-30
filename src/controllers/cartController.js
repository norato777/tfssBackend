const CartModel = require("../models/Cart.js");

module.exports = {
  //crea y guarda el historial de carros de compra
  postCart: async function (cart) {
    try {
      const cartHecho = await CartModel.findOne({ user_id: cart.user_id });
      if (cartHecho) {
        const oldProduct = await CartModel.findOne({
          product_ids: cart.product_ids[0],
        });
        if (oldProduct) {
          return console.log("producto ya existente en el cart");
        } else cartHecho.product_ids.push(cart.product_ids[0]);
        await cartHecho.save();
      } else {
        const newCart = new CartModel({
          user_id: cart.user_id,
          product_ids: cart.product_ids,
        });
        await newCart.save();
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteProductCart: async function (cart) {
    try {
      const cartToUpdate = await CartModel.findOne({ _id: cart.id });
      if (cartToUpdate) {
        // Verificamos si el producto existe en el carrito
        const index = cartToUpdate.product_ids.indexOf(cart.productId);
        if (index !== -1) {
          // Si existe, lo eliminamos
          cartToUpdate.product_ids.splice(index, 1);
          await cartToUpdate.save();
        } else {
          console.log("El producto no existe en el carrito");
        }
      } else {
        console.log("El carrito no existe");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
