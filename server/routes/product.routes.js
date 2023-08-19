const express = require("express");
const Product = require("../models/Product");
// const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.get("/:prodId", async (req, res) => {
    try {
        const { prodId } = req.params;

        if (prodId) {
            const product = await Product.findById(prodId);
            res.send(product);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({
            massage: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const list = await Product.find();
        res.status(200).send(list);
    } catch (error) {
        res.status(500).json({
            massage: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

module.exports = router;
