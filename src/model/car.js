const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true
    },
    carFactoryId: {
        type: mongoose.Types.ObjectId,
        ref: "CarFactory",
        require: true
    },
    carmodelId:{
        type: mongoose.Types.ObjectId,
        ref: "Carmodel",
        require: true
    },
    simcard: {
        type: String,
        required: true
    },
    currentKilometer: {
        type: Number,
        required: true,
        default:0
    },

}, { timestamps: true })

const Carmodel = mongoose.model("car", schema)


module.exports = Carmodel