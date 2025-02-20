const axios = require("axios");

const fetchYouTubeComments = async (videoId) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=100`;

    const response = await axios.get(apiUrl);
    const comments = response.data.items.map((item) => ({
      text: item.snippet.topLevelComment.snippet.textDisplay,
      author: item.snippet.topLevelComment.snippet.authorDisplayName,
      publishedAt: item.snippet.topLevelComment.snippet.publishedAt
    }));

    return comments;
  } catch (error) {
    console.error("Error fetching YouTube comments:", error.message);
    return [];
  }
};

module.exports = fetchYouTubeComments;
