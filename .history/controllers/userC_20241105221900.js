const User = require("../models/userModel");
const Doc = require("../models/docModel");
const Appointment = require("../models/appointmentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Registration
const registerController = async (req, res) => {
  // Registration logic...
};

// User Login
const loginController = async (req, res) => {
  // Login logic...
};

// Doctor Registration
const registerDoctorController = async (req, res) => {
  // Doctor registration logic...
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
  const { userId, doctorId, date, userInfo, doctorInfo } = req.body;

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
      appointment.document = req.file;
    }

    await appointment.save();
    res.status(201).json({ success: true, message: "Appointment booked successfully", data: appointment });
  } catch (error) {
    console.error("Booking appointment error:", error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

module.exports = { registerController, loginController, registerDoctorController, getAllDoctorsController, bookAppointmentController };
