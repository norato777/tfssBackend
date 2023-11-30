const express = require("express");
const router = express.Router();
const userSchema = require("../models/Users.js");
const { getTokenData } = require("../config/jwt.config");
const {
  deleteDocument,
  recoverDocument,
} = require("../controllers/user.controllers");

//create user
router.post("/", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mesagge: error.message }));
});

// confirmar
router.get("/confirm/:token", async (req, res) => {
  try {
    // Obtener el token
    const { token } = req.params;

    // Verificar la data
    const data = await getTokenData(token);

    if (data === null) {
      return res.json({
        success: false,
        msg: "Error al obtener data",
      });
    }

    const { email, code } = data.data;

    // Verificar existencia del usuario
    const user = (await userSchema.findOne({ email })) || null;

    if (user === null) {
      return res.json({
        success: false,
        msg: "Usuario no existe",
      });
    }

    // Verificar el código
    if (code !== user.code) {
      return res.redirect("src/global/error.html");
    }

    // Actualizar usuario
    user.status = "VERIFIED";
    await user.save();

    // Redireccionar a la confirmación

    return res.redirect("https://fullstackstore.vercel.app/");
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      msg: "Error al confirmar usuario",
    });
  }
});

//get all users
router.get("/", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mesagge: error }));
});

//get user by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ mesagge: error }));
});

// update user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  try {
    userSchema
      .findByIdAndUpdate(id, req.body)
      .then((data) => res.status(200).json(data));
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//delete user by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ mesagge: error }));
});

//borrado logico
router.put("/delete/:id", (req, res) => {
  const { id } = req.params;

  deleteDocument(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ mesagge: error }));
});
router.put("/recover/:id", (req, res) => {
  const { id } = req.params;
  recoverDocument(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ mesagge: error }));
});
module.exports = router;
