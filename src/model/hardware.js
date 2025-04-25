const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');



const schema = new mongoose.Schema({
    uniqueId: {
        type: String,
        unique: true,
        default: uuidv4
    },
    simcard: {
        type: String,
        required: true
    },
    accessToken: {
        type:String,
        default : "",
        required : false 
    }
    
}, { timestamps: true })

const message = mongoose.model("Message", schema)


module.exports = message