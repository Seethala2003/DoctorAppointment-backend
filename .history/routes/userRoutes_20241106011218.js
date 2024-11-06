const express = require("express");
const { registerController, registerDoctorController, loginController, getAllDoctorsController, bookAppointmentController, getUserDataController } = require("../controllers/userC");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer"); 

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const router = express.Router();

// User Registration 
router.post("/register", registerController); 

// User Login 
router.post("/login", loginController); 

// Doctor Registration 
router.post("/registerdoc", authMiddleware, registerDoctorController); 
// Get All Doctors router.get("/getalldoctorsu", authMiddleware, getAllDoctorsController); // Book Appointment router.post("/getappointment", authMiddleware, bookAppointmentController); // Get User Data router.post("/getuserdata", authMiddleware, getUserDataController); // Mark All Notifications as Read router.post("/getallnotification", authMiddleware, markAllNotificationsReadController); // Delete All Notifications router.post("/deleteallnotification", authMiddleware, deleteAllNotificationsController); module.exports = router;