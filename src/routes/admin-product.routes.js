
// admin routes
// GET / api / admin / products
// GET / api / admin / products /: id

// POST / api / admin / products
// PUT / api / admin / products /: id
// DELETE / api / admin / products /: id

// POST / api / admin / products / upload - images

// update product
// PATCH
//     / api / admin / products /: id / status

const express = require("express");

const {
    getAdminProducts,
    getAdminProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImages,
    updateProductStatus
} = require("../controllers/product.controller");

const {
    requireAdmin
} = require("../middleware/admin.middleware");

const upload =
    require("../middleware/upload.middleware");

const router = express.Router();


// ========================================
// ALL ADMIN PRODUCT ROUTES
// ========================================

router.use(requireAdmin);


// ========================================
// PRODUCT LIST
// ========================================

// GET /api/admin/products
router.get(
    "/",
    getAdminProducts
);


// ========================================
// PRODUCT DETAIL
// ========================================

router.patch(
    "/:id/status",
    updateProductStatus
);

// GET /api/admin/products/:id
router.get(
    "/:id",
    getAdminProductById
);


// ========================================
// CREATE PRODUCT
// ========================================

// POST /api/admin/products
router.post(
    "/",
    upload.array("images", 5),
    createProduct
);


// ========================================
// UPDATE PRODUCT
// ========================================

// PUT /api/admin/products/:id
router.put(
    "/:id",
    upload.array("images", 5),
    updateProduct
);


// ========================================
// DELETE / DEACTIVATE PRODUCT
// ========================================

// DELETE /api/admin/products/:id
router.delete(
    "/:id",
    deleteProduct
);


// ========================================
// UPLOAD PRODUCT IMAGES
// ========================================

// POST /api/admin/products/upload-images

router.post(
    "/upload-images",
    upload.array("images", 5),
    uploadProductImages
);


module.exports = router;