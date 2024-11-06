// routes/userRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel"); // Ensure the path is correct
const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
  const { fullName, email, password, phone, type } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      type,
    });

    // Save the new user
    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error); // Improved error logging
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

module.exports = router;
