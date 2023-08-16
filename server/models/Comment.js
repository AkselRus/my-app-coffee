const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        content: { type: String, required: true },
        //на чьей странице находится комментарий
        prodId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        //Кто оставил комментарий
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: { createdAt: "created_at" },
    }
);

module.exports = model("Comment", schema);
