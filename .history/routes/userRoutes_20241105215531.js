const express = require("express");
const { registerController, registerDoctorController, loginController, getAllDoctorsController } = require("../controllers/userC");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// User Registration
router.post("/register", registerController);

// User Login
router.post("/login", loginController);

// Doctor Registration
router.post("/registerdoc", authMiddleware, registerDoctorController);

// Get All Doctors
router.get("/getalldoctorsu", authMiddleware, getAllDoctorsController);

module.exports = router;
