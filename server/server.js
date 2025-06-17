const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const creds = process.env.GEMINI_API_KEY
console.log(" creds are :  " + creds);

app.post("/api/evaluate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
     `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${creds}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    res.json({ content: text });
  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Gemini evaluation failed." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
