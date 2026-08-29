const express = require("express");

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/product.controller");

const { requireAdmin } = require("../middleware/admin.middleware");

const router = express.Router();

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin
router.post("/", requireAdmin, createProduct);
router.put("/:id", requireAdmin, updateProduct);
router.delete("/:id", requireAdmin, deleteProduct);

module.exports = router;