const FavProducts = require("../models/FavProducts");
const express = require("express");
const router = express.Router();


router.post("/", (req, res) => {
    const favProduct = FavProducts(req.body);
    favProduct
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ mesagge: error.message }));
    }
);


//crear porducto favorito por id de usario y id de producto
router.post("/:id/:id", (req, res) => {
    const favProduct = FavProducts(req.body);
    favProduct
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ mesagge: error.message }));
    }
);

//obtener todos los productos favoritos
router.get("/", (req, res) => {
    FavProducts.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ mesagge: error.message }));
}
);

//obtener todos los productos favoritos por id de usuario
router.get("/user/:id", (req, res) => {
    const { id } = req.params;
    FavProducts.find({ user
        : id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ mesagge: error.message }));
}
);

//obtener todos los productos favoritos por id de producto
router.get("/product/:id", (req, res) => {
    const { id } = req.params;
    FavProducts.find({ product
        : id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ mesagge: error.message }));
}
);

//obtener todos los productos favoritos por id de usuario y id de producto
router.get("/:id/:id", (req, res) => {
    const { id } = req.params;
    FavProducts.find({ user
        : id, product
        : id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ mesagge: error.message }));
}
);

//eliminar todos los productos favoritos por id de usuario
router.delete("/user/:id", (req, res) => {
    const { id } = req.params;
    FavProducts.deleteMany({
        user: id
    })
        .then((data) => res.json(data))
        .catch((error) => res.json({ mesagge: error.message }));
}
);

//eliminar todos los productos favoritos por id de producto
router.delete("/product/:id", (req, res) => {
    const { id } = req.params;
    FavProducts.deleteMany({
        product: id
    })
        .then((data) => res.json(data))
        .catch((error) => res.json({ mesagge: error.message }));
}
);

//eliminar todos los productos favoritos por id de usuario y id de producto
router.delete("/user/:id/product/:id", (req, res) => {

    const { id } = req.params;
    FavProducts.deleteMany({
        user: id, product: id
    })
        .then((data) => res.json(data))
        .catch((error) => res.json({ mesagge: error.message }));
}
);

module.exports = router;


