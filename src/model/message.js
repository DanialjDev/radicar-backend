const mongoose = require('mongoose');



const schema = new mongoose.Schema({
    ticketId: {
        type : mongoose.Types.ObjectId,
        ref : "Ticket",
        require : true
    },
    sender: {
        type : mongoose.Schema.Types.Mixed,
        require : true
    },
    message:{
        type: String, 
        required : true
    },
    file:{
        type: String, 
        required : false 
    }
    // isSeen:{
    //     type : Boolean,
    //     required : true,
    //     default : "false"
    // }
},{ timestamps: true })

const message = mongoose.model("Message",schema)


module.exports = message