const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: { type: String },
        image: String,
        bookmark: Boolean,
        category: { type: Schema.Types.ObjectId, ref: "Category" },
        discription: String,
        price: Number,
        quantity: Number,
    },
    {
        timestamps: true,
    }
);

module.exports = model("Product", schema);
