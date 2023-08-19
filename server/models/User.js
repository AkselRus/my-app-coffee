const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        image: String,
        birthDay: Number,
        sex: { type: String, enum: ["male", "female", "other"] },
        purchases: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    {
        timestamps: true,
    }
);

module.exports = model("User", schema);
