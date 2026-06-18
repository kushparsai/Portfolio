import express from "express";
import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("📩 Contact API hit", req.body);

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 1️⃣ Save to MongoDB
    await Contact.create({ name, email, message });

    // 2️⃣ EMAIL CONFIG (FIXED)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,              // ✅ FIX
      secure: false,          // ✅ TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "📩 New Contact Message",
      html: `
        <h3>New Message Received</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(200).json({ message: "Message sent successfully" });

  } catch (error) {
    console.error("❌ Contact Error:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
});

export default router;
