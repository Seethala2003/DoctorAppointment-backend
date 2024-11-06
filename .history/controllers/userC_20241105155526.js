const User = require("../models/userModel");
const Doc = require("../models/docModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { fullName, email, password, phone, type } = req.body;

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
const loginController = async (req, res) => { 
  const { email, password } = req.body; 
  if (!email || !password) { 
    return res.status(400).json({ message: "Email and password are required", success: false }); 
  } 

  try { 
    const user = await User.findOne({ email }); 
    if (!user) { 
      return res.status(400).json({ message: "User not found", success: false });
   } 

   const isMatch = await bcrypt.compare(password, user.password); 
   if (!isMatch) { 
    return res.status(400).json({ message: "Invalid credentials", success: false }); 
  } 
  
  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: "1h" }); 
  res.status(200).json({ message: "Login successful", success: true, token }); 
} catch (error) { 
  console.error("Login error:", error); 
  res.status(500).json({ message: "Something went wrong", success: false }); 
} 
};

const registerDoctorController = async (req, res) => {
  const { fullName, email, phone, address, specialization, experience, fees, timings, userId } = req.body.doctor;

  if (!fullName || !email || !phone || !address || !specialization || !experience || !fees || !timings) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }

} 
try { 
  // Debug log to check userId 
  console.log("Received userId:", userId); 
  const user = await User.findById(userId); 

  // Debug log to check user object 
  console.log("Fetched user:", user); 

  if (!user) { 
    return res.status(404).json({ message: "User not found", success: false }); 
  } 
  
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
  
  user.isDoctor = true; 
  await user.save(); 
  
  res.status(201).json({ success: true, message: "Doctor registered successfully" }); } catch (error) { console.error("Doctor registration error:", error); res.status(500).json({ message: "Something went wrong", success: false }); } }; module.exports = { registerDoctorController };