const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    defaultNumber: {
        type: Number,
        required: true
    },
    personnelId: {
        type: mongoose.Types.ObjectId,
        ref: "Personnel",
        require: true
    },

}, { timestamps: true })

const CarTechnical = mongoose.model("CarTechnical", schema)


module.exports = CarTechnical