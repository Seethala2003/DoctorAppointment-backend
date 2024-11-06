// routes/appointmentRoutes.js

const express = require("express");
const { bookAppointmentController } = require("../controllers/appointmentC");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/bookappointment", authMiddleware, bookAppointmentController);

module.exports = router;
