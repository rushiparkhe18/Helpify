import express from "express";
import Request from "../models/Request.js";

const router = express.Router();

// 📌 GET: Fetch all requests
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests", error });
  }
});

// 📌 POST: Add a new request
router.post("/", async (req, res) => {
  try {
    const { instituteName, supplies } = req.body;
    if (!instituteName || !supplies || supplies.length === 0) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const newRequest = new Request({ instituteName, supplies });
    await newRequest.save();

    res.status(201).json({ message: "Request added successfully", newRequest });
  } catch (error) {
    res.status(500).json({ message: "Error adding request", error });
  }
});

export default router;
