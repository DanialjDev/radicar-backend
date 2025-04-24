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
        default : ""
    }

}, { timestamps: true })

const Factory = mongoose.model("CarFactory", schema)


module.exports = Factory