const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    personnelId: {
        type: mongoose.Types.ObjectId,
        ref: "Personnel",
        require: true
    },
    logo: {
        type: String,
        required: true,
        default : ""
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
    carAddress: {
        type: mongoose.Types.ObjectId,
        ref: "CarAddress",
        require: true
    },

}, { timestamps: true })

const Factory = mongoose.model("CarFactory", schema)


module.exports = Factory