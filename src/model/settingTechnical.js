const { number } = require('joi');
const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    currentNumber: {
        type: Number,
        required: true
    },
    incrementNumber : {
        type: Number,
        required: true
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

}, { timestamps: true })

const CategoryTechnical = mongoose.model("SettingTechnical", schema)


module.exports = CategoryTechnical