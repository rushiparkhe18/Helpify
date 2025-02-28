import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const REQUESTS_FILE = "data.json"; // JSON file for storing requests
const INSTITUTIONS_FILE = "institutions.json"; // JSON file for institutions

app.use(express.json());
app.use(cors());

// 📌 Function to load JSON data safely
const loadData = (file) => {
  try {
    const data = fs.readFileSync(file, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return []; // Return empty array if file doesn't exist or is corrupted
  }
};

// 📌 Function to save JSON data
const saveData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// 📌 GET all institution login data
app.get("/api/institutions", (req, res) => {
  const institutions = loadData(INSTITUTIONS_FILE);
  res.json(institutions);
});

// 📌 POST institution login data
app.post("/api/institutions", (req, res) => {
  const { institutionName, address, city, country, license } = req.body;
  
  if (!institutionName || !address || !city || !country || !license) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const institutions = loadData(INSTITUTIONS_FILE);
  const newInstitution = { institutionName, address, city, country, license, id: Date.now() };
  
  institutions.push(newInstitution);
  saveData(INSTITUTIONS_FILE, institutions);

  res.status(201).json(newInstitution);
});

// 📌 GET all requests
app.get("/api/requests", (req, res) => {
  const requests = loadData(REQUESTS_FILE);
  res.json(requests);
});

// 📌 POST a new request
app.post("/api/requests", (req, res) => {
  const { instituteName, supplies } = req.body;
  if (!instituteName || !supplies) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const requests = loadData(REQUESTS_FILE);
  const newRequest = { instituteName, supplies, id: Date.now() };
  requests.push(newRequest);

  saveData(REQUESTS_FILE, requests);
  res.status(201).json(newRequest);
});

// 📌 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
