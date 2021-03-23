require('dotenv').config();
const express = require("express");
const products = require("./products.json");

module.exports = function getRoutes() {
    const router = express.Router();
    router.get("/products", getProducts);
    router.get("/products/:id", getProduct);

    return router;
};

const getProducts = (req, res) => {
    res.status(200).json({products});
}

const getProduct = (req, res) => {
    const {id} = req.params;
    const product = products.find(product => product.id === id);
    try {
        if (!product) {
            throw new Error(`No Product found for id: ${id}`);
        }
        res.status(200).json({product});
    } catch (error) {
        res.status(404).json({message: error, statusCode: 404});
    }
}