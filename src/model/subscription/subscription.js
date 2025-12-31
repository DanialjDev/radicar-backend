const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    description:{
        type: String, 
        required : true
    },
    Category:[{
        type: String, 
        required : true
    }],
    price: {
        type:Number,
        required : true
    },
    Duration :{
        type:Number,
        required : true
    },
    status:{
        type:Boolean,
        default : false,
    },
    discount:{
        type:Number,
        required : true
    },
    isDelete:{
        type:Boolean,
        default : false,
    },
    forPerson:{
        type: String, 
        enum:["User","repairman"],
        required : true
    }

},{ timestamps: true })


const model = mongoose.model("Subscription",new mongoose.Schema(schema))


module.exports = model
