const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDB = require("./config/connectToDB");

const app = express();
dotenv.config();
connectToDB();

const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
  origin: "http://localhost:3004", // Update to match your frontend URL
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 204
}));

app.use(express.json());

app.use('/api/auth/', require('./routes/authRoutes'));
app.use('/api/user/', require('./routes/userRoutes'));
app.use('/api/admin/', require('./routes/adminRoutes'));
app.use('/api/doctor/', require('./routes/doctorRoutes'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong", success: false });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});