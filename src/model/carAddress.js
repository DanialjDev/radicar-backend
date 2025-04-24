const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    personnelId: {
        type: mongoose.Types.ObjectId,
        ref: "Personnel",
        require: true
    },
    bitMask: {
        type: String,
        required: true
    }

}, { timestamps: true })

const carAddress = mongoose.model("CarAddress", schema)


module.exports = carAddress