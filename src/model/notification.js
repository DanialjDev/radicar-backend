const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carId: {
    type: mongoose.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  technicalId: {
    type: mongoose.Types.ObjectId,
    ref: "CarTechnical",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["app", "sms"],
    default: "app",
  },
  level: {
    type: String,
    enum: ["early", "due"], 
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
