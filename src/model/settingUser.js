const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  settingNotification: {
    status: { type: String, required: true, enum: ["Inactive", "Active"], default: "Active" },
    importance: { type: String, required: true, enum: ["High", "Medium", "Low"], default: "Medium" },
    repeat: { type: String, required: true, enum: ["Every day", "Every week", "Every month"], default: "Every week" }
  },
  customKilometers: {
    engineOil: { type: Number, default: 5000 }, // روغن موتور
    hydraulicOil: { type: Number, default: 50000 }, // روغن هیدرولیک
    brakeOil: { type: Number, default: 60000 }, // روغن ترمز
    manualGearOil: { type: Number, default: 40000 }, // روغن گیربکس دستی
    automaticGearOil: { type: Number, default: 60000 }, // روغن گیربکس اتومات

    oilFilter: { type: Number, default: 5000 }, // فیلتر روغن
    airFilter: { type: Number, default: 5000 }, // فیلتر هوا
    cabinFilter: { type: Number, default: 5000 }, // فیلتر اتاق
    fuelFilter: { type: Number, default: 15000 }, // صافی بنزین

    timingBelt: { type: Number, default: 50000 }, // تسمه تایم
    alternatorBelt: { type: Number, default: 60000 }, // تسمه دینام
    hydraulicBelt: { type: Number, default: 50000 }, // تسمه هیدرولیک

    clutchKit: { type: Number, default: 50000 }, // دیسک و صفحه
    sparkPlugAndWire: { type: Number, default: 30000 }, // شمع و وایر
    frontDiscBrake: { type: Number, default: 30000 }, // لنت دیسکی (جلو)
    rearDrumBrake: { type: Number, default: 80000 }, // لنت کاسه‌ای (عقب)

    canister: { type: Number, default: 100000 }, // کنیستر
    suspension: { type: Number, default: 60000 }, // جلوبندی
    alternator: { type: Number, default: 60000 }, // دینام
    catalyticConverter: { type: Number, default: 60000 }, // کاتالیزور
    tire: { type: Number, default: 50000 } // لاستیک
  }
}, { timestamps: true });

const settingUser = mongoose.model("SettingUser", schema);

module.exports = settingUser;
