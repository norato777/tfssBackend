const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGODB_URI;

const connection = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(URI, {})
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
};

module.exports = connection;
