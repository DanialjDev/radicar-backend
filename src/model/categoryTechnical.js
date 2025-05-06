const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    ename: {
        type: String,
        required: true
    },
    personnelId: {
        type: mongoose.Types.ObjectId,
        ref: "Personnel",
        require: true
    },

}, { timestamps: true })

const CategoryTechnical = mongoose.model("CategoryTechnical", schema)


module.exports = CategoryTechnical