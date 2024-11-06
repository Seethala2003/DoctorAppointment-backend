const express = require("express");
const { registerController, registerDoctorController } = require("../controllers/userC");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// User Registration
router.post("/register", registerController);

// Doctor Registration
router.post("/registerdoc", authMiddleware, registerDoctorController);

module.exports = router;
