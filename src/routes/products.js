const { Router } = require("express");
const router = Router();
const productSchema = require("../models/Product");
const {
  putProduct,
  putProductCalification,
  deleteDocument,
  recoverDocument,
} = require("../controllers/productsController");

router.get("/", (req, res) => {
  productSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mesagge: error }));
});

router.get("/:id", (req, res) => {
  productSchema
    .findById(req.params.id)
    .then((product) => res.json(product))
    .catch((error) => res.json({ message: error }));
});

router.post("/", (req, res) => {
  const product = productSchema(req.body);
  product
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  try {
    productSchema
      .findByIdAndUpdate(id, req.body, {returnNewDocument: true, returnDocument:"after"})
      .then((data) => res.status(200).json(data));
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.put("/rating/:id", (req, res) => {
  const id = req.params.id;
  const product = req.body;
  putProductCalification(product, id)
    .then((product) => res.json(product))
    .catch((error) => res.json({ message: error }));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  productSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ mesagge: error }));
});

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

//get rating por id
router.get("/rating/:id", (req, res) => {
  const { id } = req.params;
  productSchema
    .findById(id)
    .then((product) => res.json(product.rating))
    .catch((error) => res.json({ message: error }));
});

//get coment por id de producto

router.get("/coments/:id", (req, res) => {
  const { id } = req.params;
  productSchema
    .findById(id)
    .then((product) => res.json(product.coments))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
