const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  sentiment: String, // positive, negative, neutral
  category: String,  // question, suggestion, abusive
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);
