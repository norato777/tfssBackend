const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  destacada:{
    type: Boolean,
  },
  deleted:{
    type: Boolean, default: false,
  }
});

const CategoriesModel = mongoose.model("categories", CategoriesSchema);

module.exports = CategoriesModel;
