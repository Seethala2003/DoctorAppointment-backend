const User = require("../models/userModel");
const Doc = require("../models/docModel");
const Appointment = require("../models/appointmentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Registration
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

// User Login
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

// Doctor Registration
const registerDoctorController = async (req, res) => {
  const { fullName, email, phone, address, specialization, experience, fees, timings } = req.body.doctor;
  const userId = req.userId; // Use the userId from the middleware

  if (!fullName || !email || !phone || !address || !specialization || !experience || !fees || !timings) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }

  try {
    const user = await User.findById(userId);

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

    res.status(201).json({ success: true, message: "Doctor registered successfully" });
  } catch (error) {
    console.error("Doctor registration error:", error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

// Get All Doctors
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await Doc.find({});
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    console.error("Fetching doctors error:", error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

// Book Appointment
const bookAppointmentController = async (req, res) => {
  console.log("****I need data****");
  console.log(req.body)
  const { userId, doctorId, date, userInfo, doctorInfo } = req.body;
  const file = req.file;
  console.log("***From backend***");
  console.log(userId);
  console.log(doctorId);
  console.log(date);
  console.log(userInfo);
  console.log(doctorInfo);
  console.log("File: ", file);

  if (!userId || !doctorId || !date || !userInfo || !doctorInfo) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }

  try {
    const appointment = new Appointment({
      userId,
      doctorId,
      date,
      userInfo: JSON.parse(userInfo),
      doctorInfo: JSON.parse(doctorInfo),
      status: 'pending',
    });

    if (req.file) {
      appointment.document = file.buffer; // Save the file buffer to the appointment 
      }

    await appointment.save();
    res.status(201).json({ success: true, message: "Appointment booked successfully", data: appointment });
  } catch (error) {
    console.error("Booking appointment error:", error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

// Get User Data
const getUserDataController = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Fetching user data error:", error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

// Mark All Notifications as Read 
const markAllNotificationsReadController = async (req, res) => { 
  try { 
    const user = await User.findById(req.body.userId); 
    if (!user) { 
      return res.status(404).json({ message: "User not found", success: false }); 
    } 
    
    user.seennotification = user.seennotification.concat(user.notification); 
    user.notification = []; 
    await user.save(); 

    res.status(200).json({ success: true, message: "All notifications marked as read" });
   } catch (error) { 
    console.error("Mark all notifications read error:", error);
    res.status(500).json({ message: "Something went wrong", success: false });
  } 
}; 

// Delete All Notifications 
const deleteAllNotificationsController = async (req, res) => { 
  try { 
    const user = await User.findById(req.body.userId); 
    if (!user) { 
      return res.status(404).json({ message: "User not found", success: false }); 
    } 
    
    user.seennotification = []; 
    await user.save(); 
    
    res.status(200).json({ success: true, message: "All notifications deleted" }); 
  } catch (error) { 
    console.error("Delete all notifications error:", error); 
    res.status(500).json({ message: "Something went wrong", success: false }); 
  } 
}; 

const getUserAppointmentsController = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is set in authMiddleware
    const appointments = await appointmentSchema.find({ userId }).populate("doctorId", "fullName email phone");
    if (!appointments) {
      return res.status(404).send({ message: "No appointments found", success: false });
    }
    return res.status(200).send({ message: "Appointments fetched successfully", success: true, data: appointments });
  } catch (error) {
    console.log("Error fetching appointments: ", error);
    return res.status(500).send({ message: "Something went wrong", success: false });
  }
};


module.exports = { registerController, loginController, registerDoctorController, getAllDoctorsController, bookAppointmentController, getUserDataController, markAllNotificationsReadController, deleteAllNotificationsController, };

