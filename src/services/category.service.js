const Category = require("../models/Category");

const createCategory = async (data) => {
    return await Category.create(data);
};


// for getting category details
const getCategories = async () => {
    return await Category.find({ isActive: true }).sort({ name: 1 });
};

const getCategoryById = async (id) => {

    return await Category.findOne({
        _id: id,
        isActive: true
    });

};

const updateCategory = async (id, data) => {
    return await Category.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

// only need soft delete 
const deleteCategory = async (id) => {

    return await Category.findByIdAndUpdate(
        id,
        {
            isActive: false
        },
        {
            new: true
        }
    );

};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};