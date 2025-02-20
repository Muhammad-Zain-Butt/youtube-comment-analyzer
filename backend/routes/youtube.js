const express = require("express");
const fetchYouTubeComments = require("../utils/youtubeAPI");

const router = express.Router();

const Comment = require("../models/Comment");

router.get("/comments", async (req, res) => {
  try {
    const { videoId } = req.query;
    if (!videoId) {
      return res.status(400).json({ error: "Missing videoId parameter" });
    }
    // Fetch comments from YouTube API
    const comments = await fetchYouTubeComments(videoId);

    // Save comments to MongoDB
    const savedComments = await Comment.insertMany(
      comments.map((c) => ({
        text: c.text,
        sentiment: "neutral", // Default sentiment
        category: "general", // Default category
        createdAt: c.publishedAt,
      }))
    );

    res.status(200).json(savedComments);
  } catch (error) {
    console.error("Error fetching and saving comments:", error);
    res.status(500).json({ error: "Error fetching and saving comments" });
  }
});


// // GET /youtube/comments?videoId=VIDEO_ID
// router.get("/comments", async (req, res) => {
//   try {
//     const { videoId } = req.query;
//     if (!videoId) {
//       return res.status(400).json({ error: "Missing videoId parameter" });
//     }

//     const comments = await fetchYouTubeComments(videoId);
//     res.status(200).json(comments);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching YouTube comments" });
//   }
// });

module.exports = router;
