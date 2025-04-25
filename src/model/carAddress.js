const mongoose = require('mongoose');


const schema = new mongoose.Schema({
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
    }


}, { timestamps: true })

const carAddress = mongoose.model("CarAddress", schema)


module.exports = carAddress