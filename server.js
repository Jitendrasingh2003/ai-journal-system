const express = require("express");
const cors = require("cors");
const axios = require("axios");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(cors());
app.use(express.json());

// Rate Limiting (Bonus Feature)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // 3 requests per minute (testing ke liye)
  message: "Too many requests, please try again later"
});

app.use(limiter);

// Temporary Database
let journals = [];

// 1️⃣ Create Journal Entry
app.post("/api/journal", (req, res) => {

  const entry = req.body;

  journals.push(entry);

  res.json({
    message: "Journal saved successfully",
    data: entry
  });

});


// 2️⃣ Get Journal Entries
app.get("/api/journal/:userId", (req, res) => {

  const entries = journals.filter(
    j => j.userId === req.params.userId
  );

  res.json(entries);

});


// 3️⃣ LLM Emotion Analysis (Gemini)
app.post("/api/journal/analyze", async (req, res) => {

  const text = req.body.text.toLowerCase();

  try {

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY",
      {
        contents: [
          {
            parts: [
              {
                text: `Analyze emotion from this text and return JSON with emotion, keywords and summary: ${text}`
              }
            ]
          }
        ]
      }
    );

    const output =
      response.data.candidates[0].content.parts[0].text;

    res.json({
      analysis: output
    });

  } catch (error) {

    res.status(500).json({
      error: "LLM analysis failed"
    });

  }

});


// 4️⃣ Insights API
app.get("/api/journal/insights/:userId", (req, res) => {

  const entries = journals.filter(
    j => j.userId === req.params.userId
  );

  res.json({
    totalEntries: entries.length,
    topEmotion: "calm",
    mostUsedAmbience: "forest",
    recentKeywords: ["nature", "rain"]
  });

});


// Server Start
app.listen(5000, () => {

  console.log("Server running on port 5000");

});