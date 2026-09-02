const Product = require("../models/Product");


// =========================
// GET ADMIN PRODUCTS
// =========================

const getAdminProducts = async (query) => {

    const {
        search,
        category,
        status,
        stock,
        page = 1,
        limit = 10
    } = query;


    const filter = {};


    // =========================
    // SEARCH
    // =========================

    if (search) {

        filter.$or = [

            {
                name: {
                    $regex: search,
                    $options: "i"
                }
            },

            {
                slug: {
                    $regex: search,
                    $options: "i"
                }
            }

        ];

    }


    // =========================
    // CATEGORY
    // =========================

    if (category) {

        filter.category = category;

    }


    // =========================
    // ACTIVE / INACTIVE
    // =========================

    if (status === "active") {

        filter.isActive = true;

    }

    if (status === "inactive") {

        filter.isActive = false;

    }


    // =========================
    // STOCK FILTER
    // =========================

    if (stock === "out") {

        filter.stock = 0;

    }

    if (stock === "low") {

        filter.stock = {
            $gt: 0,
            $lte: 10
        };

    }

    if (stock === "available") {

        filter.stock = {
            $gt: 0
        };

    }


    // =========================
    // PAGINATION
    // =========================

    const currentPage =
        Math.max(
            Number(page) || 1,
            1
        );

    const itemsPerPage =
        Math.min(
            Math.max(
                Number(limit) || 10,
                1
            ),
            100
        );

    const skip =
        (currentPage - 1) *
        itemsPerPage;


    // =========================
    // QUERY
    // =========================

    const [products, total] =
        await Promise.all([

            Product.find(filter)

                .populate(
                    "category",
                    "name slug"
                )

                .sort({
                    createdAt: -1
                })

                .skip(skip)

                .limit(itemsPerPage)

                .lean(),


            Product.countDocuments(filter)

        ]);


    return {

        products,

        pagination: {

            total,

            page: currentPage,

            limit: itemsPerPage,

            totalPages:
                Math.ceil(
                    total /
                    itemsPerPage
                )

        }

    };

};


// =========================
// GET ADMIN PRODUCT
// =========================

const getAdminProductById = async (id) => {

    return await Product.findById(id)

        .populate(
            "category",
            "name slug"
        )

        .lean();

};

const updateProductStatus = async (
    id,
    isActive
) => {

    return await Product.findByIdAndUpdate(
        id,

        {
            isActive
        },

        {
            new: true,
            runValidators: true
        }

    )
        .populate(
            "category",
            "name slug"
        )
        .lean();

};


module.exports = {
    getAdminProducts,
    getAdminProductById,
    updateProductStatus
};