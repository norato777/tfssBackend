const UsersModel = require("../models/Users.js");

module.exports = {
  deleteDocument: async (id) => {
    try {
      await UsersModel.findByIdAndUpdate({ _id: id }, { deleted: true });
    } catch (error) {
      console.log(error);
    }
  },
  recoverDocument: async (id) => {
    try {
      await UsersModel.findByIdAndUpdate({ _id: id }, { deleted: false });
    } catch (error) {
      console.log(error);
    }
  },
};
