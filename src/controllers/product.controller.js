const productService = require("../services/product.service");
const adminProductService = require("../services/admin-product.service");

// simple old flow without image upload
// const createProduct = async (req, res) => {
//     try {
//         const product = await productService.createProduct(req.body);

//         res.status(201).json({
//             success: true,
//             message: "Product created successfully",
//             data: product
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };


// =========================
// ADMIN PRODUCT LIST
// =========================

// const getAdminProducts = async (
//     req,
//     res
// ) => {

//     try {

//         const result =
//             await adminProductService
//                 .getAdminProducts(
//                     req.query
//                 );


//         res.status(200).json({

//             success: true,

//             data: result.products,

//             pagination:
//                 result.pagination

//         });

//     } catch (error) {

//         console.error(
//             "Admin products error:",
//             error
//         );

//         res.status(500).json({

//             success: false,

//             message: error.message

//         });

//     }

// };


// =========================
// ADMIN PRODUCT DETAIL
// =========================

const getAdminProductById = async (
    req,
    res
) => {

    try {

        const product =
            await adminProductService
                .getAdminProductById(
                    req.params.id
                );


        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found"

            });

        }


        res.status(200).json({

            success: true,

            data: product

        });

    } catch (error) {

        console.error(
            "Admin product detail error:",
            error
        );

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const createProduct = async (req, res) => {

    try {

        const data = { ...req.body };

        // =========================
        // PRODUCT IMAGES
        // =========================

        if (req.files && req.files.length > 0) {
            data.images =
                req.files.map(file => {
                    return `${req.protocol}://${req.get("host")}/uploads/products/${file.filename}`;
                });
        } else {
            data.images = [];
        }


        // =========================
        // INGREDIENTS
        // =========================

        if (typeof data.ingredients === "string") {
            try {
                data.ingredients = JSON.parse(data.ingredients);
            } catch {
                data.ingredients = data.ingredients.split(",").map(item => item.trim()).filter(Boolean);
            }
        }

        const product = await productService.createProduct(data);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });

    } catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getProducts = async (req, res) => {
    try {
        const result = await productService.getProducts(req.query);

        res.status(200).json({
            success: true,
            data: result.products,
            pagination: result.pagination
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(
            req.params.id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAdminProducts = async (req, res) => {
    try {
        const result =
            await adminProductService.getAdminProducts(
                req.query
            );

        res.status(200).json({
            success: true,
            data: result.products,
            pagination: result.pagination
        });
    } catch (error) {
        console.error(
            "Admin products error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const uploadProductImages = async (
    req,
    res
) => {

    try {

        if (
            !req.files ||
            req.files.length === 0
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Please select at least one image"
            });
        }


        const imageUrls =
            req.files.map(
                file => {

                    return `${req.protocol}://${req.get("host")}/uploads/products/${file.filename}`;

                }
            );


        res.status(200).json({

            success: true,

            message:
                "Images uploaded successfully",

            data: {
                images: imageUrls
            }
        });

    } catch (error) {

        console.error(
            "Image upload error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                error.message
        });
    }
};

const updateProductStatus = async (
    req,
    res
) => {

    try {

        const {
            isActive
        } = req.body;


        if (
            typeof isActive !== "boolean"
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "isActive must be a boolean"

            });

        }


        const product =
            await adminProductService
                .updateProductStatus(
                    req.params.id,
                    isActive
                );


        if (!product) {

            return res.status(404).json({

                success: false,

                message:
                    "Product not found"

            });

        }


        res.status(200).json({

            success: true,

            message:
                isActive
                    ? "Product activated successfully"
                    : "Product deactivated successfully",

            data: product

        });

    } catch (error) {

        console.error(
            "Update product status error:",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getAdminProducts,
    getAdminProductById,
    uploadProductImages,
    updateProductStatus
};