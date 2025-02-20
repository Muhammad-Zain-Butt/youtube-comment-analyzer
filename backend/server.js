require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const commentRoutes = require("./routes/comments");
app.use("/comments", commentRoutes);

const youtubeRoutes = require("./routes/youtube");
app.use("/youtube", youtubeRoutes);


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("YouTube Comment Analyzer Backend is Running!");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
