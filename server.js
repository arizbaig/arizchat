import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend from ./public
app.use(express.static("public"));

// POST /chat -> forwards messages to model
app.post("/chat", async (req, res) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing server API key" });

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5000",
        "X-Title": "Ariz's Chatbot"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: req.body.messages,
        stream: false,
        temperature: 0.7
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);

    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Set port: use environment PORT or 5000 if 3000 busy
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Ariz's Chatbot server running on http://localhost:${PORT}`));
