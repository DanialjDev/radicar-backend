const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: { 
        type: String, required: true
     },
    personnelId: {
        type: mongoose.Types.ObjectId,
        ref: "Personnel",
        require: true
    },
    kilometer: {
        addr: { type: String, required: true },
        bitMask: { type: Number, required: true }
    },
    ignitionStatus: {
        addr: { type: String, required: true },
        bitMask: { type: Number, required: true }
    },
    network:{
        type: String,
        required: true,
        enum : ["test1","test2"]
    }


}, { timestamps: true })

const carAddress = mongoose.model("CarAddress", schema)


module.exports = carAddress