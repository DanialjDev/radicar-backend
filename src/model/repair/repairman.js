const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const schema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    username: {
        type: String,
        unique: true,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: false
    },
    nationalCode: {
        type: String,
        unique: true,
        required: false
    },
    nationalCodeImage: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'File'
    }],
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: false
    },
    email: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    birthday: {
        type: Date,
        required: false
    },
    accessToken: {
        type: String,
        default: "",
        required: false
    }
}, { timestamps: true })


schema.pre("save", function () {
    if (this.password) {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
});

schema.pre("update", function () {
    if (this.password) {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
});
const Repairman = mongoose.model("Repairman", schema)


module.exports = Repairman