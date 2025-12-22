import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false });
    }

    await Message.create({ name, email, message });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

export default router;
