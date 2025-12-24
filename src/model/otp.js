const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const schema = new mongoose.Schema({
    code: {
        type : String,
        required : true
    },
    userId:{
        type : mongoose.Types.ObjectId,
        ref : "User",
        require : false
    },
    repairmanId:{
        type : mongoose.Types.ObjectId,
        ref : "Repairman",
        require : false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 
      }

},{ timestamps: true })

const otp = mongoose.model("Otp",schema)


module.exports = otp