// api/random.js
const fs = require("fs");
const path = require("path");

// Load quotes once at module load (cached per serverless instance)
let quotes = [];
try {
  const p = path.join(__dirname, "..", "quotes.json"); // root quotes.json
  const raw = fs.readFileSync(p, "utf8");
  quotes = JSON.parse(raw);
  console.log("Loaded", quotes.length, "quotes");
} catch (e) {
  console.error("Failed to load quotes.json:", e && e.message);
  quotes = [];
}

module.exports = (req, res) => {
  try {
    if (!quotes || quotes.length === 0) {
      return res.status(500).json({ error: "No quotes available" });
    }
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    // allow browser frontend calls
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(q);
  } catch (err) {
    console.error("Handler error:", err && err.message);
    res.status(500).json({ error: "Server error" });
  }
};
