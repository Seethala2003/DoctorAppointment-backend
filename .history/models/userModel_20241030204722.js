// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name is required"],
    set: function (value) {
      // Capitalize the first letter of the name
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Ensure email is unique
    trim: true, // Remove whitespace from both ends
    lowercase: true, // Convert to lowercase for consistency
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
    enum: ['user', 'admin'], // Optional: restricts the type to specific values
  },
  notification: {
    type: [String], // Specify the type of elements in the array
    default: [],
  },
  seennotification: {
    type: [String], // Specify the type of elements in the array
    default: [],
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
});

// Export the model
module.exports = mongoose.model("User", userSchema); // Use "User" as the model name for better clarity
