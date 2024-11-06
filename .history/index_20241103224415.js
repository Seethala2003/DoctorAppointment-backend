// index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDB = require("./config/connectToDB"); // Ensure this path is correct

const app = express();
dotenv.config();
connectToDB();

// Set a default port if not defined in environment variables
const PORT = process.env.PORT || 8000; 

// Middleware
app.use(express.json()); // Parse JSON request bodies

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:3001', // Replace with your frontend URL
  methods: ['GET','HEAD',PUT,PATCH,POST,DELETE,'OPTIONS'], // Allowed methods
  credentials: true // Enable set cookies
}));

// Define routes
app.use('/api/user/', require('./routes/userRoutes')); // User-related routes
app.use('/api/admin/', require('./routes/adminRoutes')); // Admin-related routes
app.use('/api/doctor/', require('./routes/doctorRoutes')); // Doctor-related routes

// Error handling middleware (should be defined after all routes)
app.use((err, req, res, next) => {
  console.error(err); // Improved error logging
  res.status(500).json({ message: "Something went wrong", success: false });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
