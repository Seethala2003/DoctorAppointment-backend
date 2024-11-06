const User = require("../models/userModel");
const docSchema = require("../models/docModel");
const bcrypt = require("bcryptjs");

// User Registration
const registerController = async (req, res) => {
  const { fullName, email, password, phone, type } = req.body;

  // Validate input
  if (!fullName || !email || !password || !phone || !type) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists", success: false });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      type,
    });

    // Save user to database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

// Doctor Registration
const registerDoctorController = async (req, res) => {
  const { fullName, email, phone, address, specialization, experience, fees, timings, userId } = req.body.doctor;

  try {
    // Validate input
    if (!fullName || !email || !phone || !address || !specialization || !experience || !fees || !timings) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    // Create new doctor profile
    
    ({ userId, fullName, email, phone, address, specialization, experience, fees, timings, });

    // Save the doctor profile
    await newDoctor.save();

    // Update user isDoctor status
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
