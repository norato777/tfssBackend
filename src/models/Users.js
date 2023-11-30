const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
var findOrCreate = require("mongoose-findorcreate");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "UNVERIFIED",
  },
  direccion: {
    type: Array,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  favoritos: {
    type: Array,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.encryptPassword = (password) => {
  try {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  } catch (error) {
    return { error: error.message };
  }
};

UserSchema.methods.comparePassword = function (password) {
  try {
    return bcrypt.compareSync(password, this.password);
  } catch (error) {
    return { error: error.message };
  }
};

UserSchema.plugin(findOrCreate);

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
