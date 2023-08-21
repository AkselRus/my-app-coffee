const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: { type: String },
        image: { type: String },
        bookmark: { type: Boolean },
        categories: { type: String },
        category: { type: String },
        description: { type: String },
        price: { type: Number },
        quantity: { type: Number },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Product", schema);
