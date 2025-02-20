const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();

// Save a new comment
router.post("/add", async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debugging log
    const { text, sentiment, category } = req.body;

    // ✅ Validate request body
    if (!text || !sentiment || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newComment = new Comment({ text, sentiment, category });
    await newComment.save();

    res.status(201).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ error: "Error saving comment", details: error.message });
  }
});

  

// Get all comments
router.get("/all", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
});



module.exports = router;
