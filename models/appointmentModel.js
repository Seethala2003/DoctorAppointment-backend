const mongoose = require('mongoose');

const appointmentSchemaDefinition = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  userInfo: {
    _id: { type: String }, // Stored as string
    fullName: String,
    email: String,
    password: String,
    phone: String,
    type: String,
    isDoctor: Boolean,
    notification: [Object],
    seennotification: [Object],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    __v: { type: Number, default: 0 }
  },
  doctorInfo: {
    _id: { type: String },
    userId: { type: String },
    fullName: String,
    email: String,
    phone: String,
    address: String,
    specialization: String,
    experience: String,
    fees: Number,
    status: String,
    timings: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    __v: { type: Number, default: 0 }
  },
  date: String,
  status: String,
  document: {
    data: Buffer,
    contentType: String,
    filename: String 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  __v: { type: Number, default: 0 }
});

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchemaDefinition);

module.exports = Appointment;
