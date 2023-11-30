const { findById } = require("../models/Cart.js");
const ProductsModel = require("../models/Product.js");

module.exports = {
  putProduct: async function (id, product) {
    try {
      const oldProduct = await ProductsModel.findByIdAndUpdate(id);
      if (oldProduct) {
        oldProduct.quantity = product.quantity;
        oldProduct.price = product.price;
        console.log("Actualizado");
      }
      await oldProduct.save();
    } catch (error) {
      console.log(error);
    }
  },
  putProductCalification: async function (product) {
    try {
      const oldProduct = await ProductsModel.findByIdAndUpdate(product._id);
      if (oldProduct) {
        oldProduct.calification.push(product.calification);
        let promedio =
          oldProduct.calification.reduce((a, b) => a + b, 0) /
          oldProduct.calification.length;
        oldProduct.promedio = promedio;
        oldProduct.coments.push(product.coments);

        console.log("se agrego comentario y rating");
      }
      await oldProduct.save();
    } catch (error) {
      console.log(error);
    }
  },
  deleteDocument: async (id) => {
    try {
      await ProductsModel.findByIdAndUpdate({ _id: id }, { deleted: true });
    } catch (error) {
      console.log(error);
    }
  },
  recoverDocument: async (id) => {
    try {
      await ProductsModel.findByIdAndUpdate({ _id: id }, { deleted: false });
    } catch (error) {
      console.log(error);
    }
  },
};
