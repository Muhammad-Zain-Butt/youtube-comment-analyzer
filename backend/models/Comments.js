const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  videoId: String,
  author: String,
  text: String,
  category: String, // Positive, Negative, Abusive, Suggestion, Question
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);
