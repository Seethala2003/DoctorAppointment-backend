const express = require("express");
const { registerController, registerDoctorController, loginController } = require("../controllers/userC");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// User Registration
router.post("/register", registerController);

// User Login
router.post("/login", loginController);

// Doctor Registration
router.post("/registerdoc", authMiddleware, registerDoctorController);

module.exports = router;

