const mongoose = require('mongoose');



const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true
    },
    personnelId: {
        type: mongoose.Types.ObjectId,
        ref: "Personnel",
        require: false
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Open", "Close"],
        default: "Open",
        required: true
    },
    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Medium",
        required: true
    },
    userStatus: {
        type: String,
        enum: ['pending', 'answered'],
        default: 'answered'
    },

    supportStatus: {
        type: String,
        enum: ['pending', 'answered'],
        default: 'pending' 
    },
}, { timestamps: true })

const ticket = mongoose.model("Ticket", schema)


module.exports = ticket