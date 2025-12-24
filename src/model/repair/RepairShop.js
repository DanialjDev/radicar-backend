const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const schema = new mongoose.Schema({
    repairmanId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Repairman',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        unique: true,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    county: {
        type: String,
        required: false
    },
    ownerStatus: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    plate: {
        type: String,
        required: false
    },
    contactNumber: [{
        type: String,
        required: false
    }],
    repairShopImage: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'File'
    }],
    location: {
        type: String,
        required: false
    },
    approvalStatus:{
        type: String,
        enum: ["","confirmed", "Not confirmed", "Awaiting confirme"],
        required: false
    },
    isActive : {
        type: Boolean,
        default : false,
        required: false
    }
}, { timestamps: true })

const Repairman = mongoose.model("RepairShop", schema)


module.exports = Repairman