const Product = require("../models/Product");

const createProduct = async (data) => {
    return await Product.create(data);
};

const getProducts = async (query) => {
    const {
        search,
        category,
        minPrice,
        maxPrice,
        sort,
        page = 1,
        limit = 12
    } = query;

    const filter = {
        isActive: true
    };

    // Search
    if (search) {
        filter.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    // Category
    if (category) {
        filter.category = category;
    }

    // Price range
    if (minPrice || maxPrice) {
        filter.price = {};

        if (minPrice) {
            filter.price.$gte = Number(minPrice);
        }

        if (maxPrice) {
            filter.price.$lte = Number(maxPrice);
        }
    }

    // Pagination
    const currentPage = Number(page);
    const itemsPerPage = Number(limit);

    const skip = (currentPage - 1) * itemsPerPage;

    // Sorting
    let sortOption = {
        createdAt: -1
    };

    if (sort === "price_asc") {
        sortOption = {
            price: 1
        };
    }

    if (sort === "price_desc") {
        sortOption = {
            price: -1
        };
    }

    if (sort === "name_asc") {
        sortOption = {
            name: 1
        };
    }

    const [products, total] = await Promise.all([
        Product.find(filter)
            .populate("category", "name slug")
            .sort(sortOption)
            .skip(skip)
            .limit(itemsPerPage),

        Product.countDocuments(filter)
    ]);

    return {
        products,
        pagination: {
            total,
            page: currentPage,
            limit: itemsPerPage,
            totalPages: Math.ceil(total / itemsPerPage)
        }
    };
};

const getProductById = async (id) => {
    return await Product.findById(id)
        .populate("category", "name slug");
};

const updateProduct = async (id, data) => {
    return await Product.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    ).populate("category", "name slug");
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};