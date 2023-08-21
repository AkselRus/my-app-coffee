const categoryMock = require("../mock/categories.json");
const productMock = require("../mock/products.json");
// const userMock = require("../mock/users.json");

const Category = require("../models/Category");
const Product = require("../models/Product");
// const User = require("../models/User");

module.exports = async () => {
    const categories = await Category.find();
    if (categories.length !== categoryMock.length) {
        await createInitialEntity(Category, categoryMock);
    }

    const products = await Product.find();
    if (products.length !== productMock.length) {
        await createInitialEntity(Product, productMock);
    }

    // const user = await User.find();
    // if (user.length !== userMock.length) {
    //     await createInitialEntity(User, userMock);
    // }
};

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async (item) => {
            try {
                delete item._id;
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch (error) {
                return error;
            }
        })
    );
}
