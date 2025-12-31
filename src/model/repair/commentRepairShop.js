const mongoose = require('mongoose');



const schema = new mongoose.Schema({
    repairShopId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'RepairShop',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: false
    },
    repairmanId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Repairman',
        required: false
    },
    reply: {
        type: mongoose.Schema.Types.ObjectId, ref: 'CommentRepairShop',
        required: false
    },
    stars: {
        type: number,
        required: false
    },
    status: {
        type: String,
        enum : ["Accept","Waiting","Reject"],
        default : "Waiting",
        required: false
    },
    text: {
        type: String,
        required: false
    }

}, { timestamps: true })

const Repairman = mongoose.model("CommentRepairShop", schema)


module.exports = Repairman