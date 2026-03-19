// index.js
import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public")); // Serve frontend HTML

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Initialize SQLite database
const db = new sqlite3.Database("./database/chat.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create messages table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT,
    content TEXT
  )
`);

// Chat endpoint with conversation memory
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  // Save user message
  db.run(
    "INSERT INTO messages(role, content) VALUES (?, ?)",
    ["user", userMessage]
  );

  // Load conversation history
  db.all(
    "SELECT role, content FROM messages ORDER BY id ASC",
    async (err, rows) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      // Prepare messages for OpenAI API
      const messages = [
        { role: "system", content: "You are a helpful chatbot." },
        ...rows
      ];

      try {
        // Call OpenAI API
        const response = await client.chat.completions.create({
          model: "gpt-4o-mini",
          messages: messages
        });

        const botReply = response.choices[0].message.content;

        // Save AI response
        db.run(
          "INSERT INTO messages(role, content) VALUES (?, ?)",
          ["assistant", botReply]
        );

        res.json({ reply: botReply });
      } catch (apiError) {
        console.error("OpenAI API error:", apiError);
        res.status(500).json({ error: "Error communicating with AI" });
      }
    }
  );
});

// Endpoint to get full conversation history
app.get("/history", (req, res) => {
  db.all("SELECT * FROM messages ORDER BY id ASC", [], (err, rows) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(rows);
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
