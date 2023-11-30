const { Router } = require("express");
const router = Router();
const CategoriesSchema = require("../models/Categories");
const { getCategories, deleteDocument, recoverDocument } = require("../controllers/categories.controllers");

router.get("/", (req, res) => {
  CategoriesSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mesagge: error }));
});
router.post("/", (req, res) => {
  CategoriesSchema;
  getCategories()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mesagge: error }));
});
router.put("/delete/:id", (req, res) => {
  const { id } = req.params;
  console.log(id)
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
