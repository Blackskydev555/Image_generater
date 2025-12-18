import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const NANO_BASE_URL = process.env.NANO_BANANA_API_BASE || "http://localhost:10000";
const NANO_API_KEY = process.env.NANO_BANANA_API_KEY || "";

app.post("/api/generate", async (req, res) => {
  const { prompt, batchSize } = req.body || {};

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const n = Number.isInteger(batchSize) && batchSize > 0 ? batchSize : 1;

  try {
    // NOTE: Adjust this endpoint and payload to match your actual Nano Banana server API.
    const response = await fetch(`${NANO_BASE_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(NANO_API_KEY ? { Authorization: `Bearer ${NANO_API_KEY}` } : {})
      },
      body: JSON.stringify({
        prompt,
        n
      })
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return res.status(response.status).json({
        error: "Nano Banana API error",
        status: response.status,
        details: text
      });
    }

    const data = await response.json();

    // Expecting something like { images: [ "data:image/png;base64,..." ] } or similar.
    // We just proxy whatever we get.
    return res.json(data);
  } catch (err) {
    console.error("Error calling Nano Banana API:", err);
    return res.status(500).json({ error: "Server error calling Nano Banana API" });
  }
});

// Fallback to index.html for root
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Nano Banana demo UI listening on http://localhost:${port}`);
});    


