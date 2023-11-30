const ProductsModel = require("../models/Product.js");
const CategoriesModel = require("../models/Categories");

module.exports = {
  getCategories: async function () {
    try {
      const category = await CategoriesModel.find();
      const numCategory = category.map((e) => e.name).filter(e=>e.length>2)
      const products = await ProductsModel.find();
      const categories = products.reduce((acc, product) => {
        acc[product.categories] = true;
        return acc;
      }, {});
      const uniqueCategories = Object.keys(categories)
      if (uniqueCategories.length !== category.length) {
        uniqueCategories.forEach((cat) => {
          const obj = Object({ name: cat });
            CategoriesModel(obj).save();
        });
        return uniqueCategories;
      } else return category;
    } catch (error) {
      console.log(error);
    }
  },
  deleteDocument: async (id) => {

    try {
      await CategoriesModel.findByIdAndUpdate({ _id: id }, { deleted: true });  
    } catch (error) {
      console.log(error)
    }
  },
  recoverDocument: async (id) => {
    try {
      await CategoriesModel.findByIdAndUpdate({ _id: id }, { deleted: false });  
    } catch (error) {
      console.log(error)
    }
  },
};
