const User = require("../models/userModel");
const Doc = require("../models/docModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { fullName, email, password, phone, type } = req.body;
  

const loginController = async (req, res) => { 
    const { email, password } = req.body;

  if (!fullName || !email || !password || !phone || !type) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      type,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

const registerDoctorController = async (req, res) => {
  const { fullName, email, phone, address, specialization, experience, fees, timings, userId } = req.body.doctor;

  if (!fullName || !email || !phone || !address || !specialization || !experience || !fees || !timings) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }

  try {
    const newDoctor = new Doc({
      userId,
      fullName,
      email,
      phone,
      address,
      specialization,
      experience,
      fees,
      timings,
    });

    await newDoctor.save();

    const user = await User.findById(userId);
    user.isDoctor = true;
    await user.save();

    res.status(201).json({ success: true, message: "Doctor registered successfully" });
  } catch (error) {
    console.error("Doctor registration error:", error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

module.exports = { registerController, registerDoctorController };
