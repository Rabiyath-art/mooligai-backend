const express = require("express");

const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    getAdminCategories
} = require("../controllers/category.controller");

const {
    requireAdmin
} = require("../middleware/admin.middleware");

const router = express.Router();


// =========================
// PUBLIC
// =========================

// Get active categories
router.get("/", getCategories);

router.get("/admin/list", requireAdmin, getAdminCategories);

// Get category by ID
router.get("/:id", getCategoryById);

// =========================
// ADMIN
// =========================

// Create category
router.post("/", requireAdmin, createCategory);

// Update category
router.put("/:id", requireAdmin, updateCategory);

// Delete category
router.delete(
    "/:id",
    requireAdmin,
    deleteCategory
);


module.exports = router;