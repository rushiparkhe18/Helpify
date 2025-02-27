import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const DATA_FILE = "data.json"; // JSON file as database

app.use(express.json());
app.use(cors());

// 📌 Load requests from JSON file
const loadRequests = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return []; // Return empty array if file doesn't exist or is corrupted
  }
};

// 📌 Save requests to JSON file
const saveRequests = (requests) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(requests, null, 2));
};

// 📌 GET all requests
app.get("/api/requests", (req, res) => {
  const requests = loadRequests();
  res.json(requests);
});

// 📌 POST a new request
app.post("/api/requests", (req, res) => {
  const { instituteName, supplies } = req.body;
  if (!instituteName || !supplies) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const requests = loadRequests();
  const newRequest = { instituteName, supplies, id: Date.now() };
  requests.push(newRequest);

  saveRequests(requests);
  res.status(201).json(newRequest);
});

// 📌 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
