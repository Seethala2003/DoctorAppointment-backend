const express = require("express");
const { registerController, registerDoctorController, loginController, getAllDoctorsController, bookAppointmentController, getUserDataController } = require("../controllers/userC");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer"); 

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const router = express.Router();

/