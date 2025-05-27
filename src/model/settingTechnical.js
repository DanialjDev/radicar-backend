const { number } = require('joi');
const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    currentNumber: {  // این متغییر برای ثبت کیلومتری است که کاربر قطعه رو اخرین بار عوض کرد
        type: Number,
        required: true,
        default : 0
    },
    incrementNumber : {// این متغییر برای ثبت کیلومتری است که کاربر میخواد هر n کیلومتر قطعه عوض بشه
        type: Number,
        required: true,
        default : 0
    },
    technicalId: {
        type: mongoose.Types.ObjectId,
        ref: "CarTechnical",
        require: true
    },
    carId: {
        type: mongoose.Types.ObjectId,
        ref: "Car",
        require: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "CategoryTechnical",
        require: true
    }

}, { timestamps: true })

const SettingTechnical   = mongoose.model("SettingTechnical", schema)


module.exports = SettingTechnical 