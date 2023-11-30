const auth = require("../middleware/auth");
const express = require("express");
const controller = require("../controllers/index.controllers");
const signUp = require("./signUp.routes");
const signIn = require("./signIn.routes");
const logOut = require("./logOut.routes");
const cart = require("./cart.js");
const products = require("./products.js");
const categories = require("./categories.js");
const users = require("./users");
const router = express.Router();
const FavProducts = require("./ProductFav");
const passport = require("../passport/local-auth");
require("dotenv").config();

router.get("/", controller.index);
router.use("/cart", auth, cart);
router.use("/products", products);
router.use("/categories", categories);
router.use("/users", users);
router.use("/signup", signUp);
router.use("/signin", signIn);
router.use("/logout", logOut);
router.use("/favorites", FavProducts);
router.use("/forgotpassword", passport.forgotPassword);
router.use(process.env.URL1, passport.resetPassword);

module.exports = router;
