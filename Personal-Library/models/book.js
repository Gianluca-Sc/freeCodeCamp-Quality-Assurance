const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  comments: { type: [String], default: [] },
});

bookSchema.virtual("commentcount").get(function () {
  return this.comments.length;
});

module.exports = mongoose.model("Book", bookSchema);
