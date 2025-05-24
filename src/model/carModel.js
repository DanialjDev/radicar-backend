const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true, // مثل: "peugeot-206-tip5-1395"
        lowercase: true,
        trim: true
    },
    buildYear: {
        type: Number,
        required: true // مثلاً: 1395
    },
    personnelId: {
        type: mongoose.Types.ObjectId,
        ref: "Personnel",
        require: true
    },
    logo: {
        type: String,
        required: false,
        default: ""
    },
    carFactoryId: {
        type: mongoose.Types.ObjectId,
        ref: "CarFactory",
        require: true
    },
    carTechnicalId: [
        {
            type: mongoose.Types.ObjectId,
            ref: "CarTechnical",
            require: true
        }
    ],
    carAddressId: {
        type: mongoose.Types.ObjectId,
        ref: "CarAddress",
        require: true
    },

}, { timestamps: true })

const Carmodel = mongoose.model("Carmodel", schema)


module.exports = Carmodel