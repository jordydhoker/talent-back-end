const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
