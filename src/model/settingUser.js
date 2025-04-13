const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const schema = new mongoose.Schema({
    userId: {
        type : mongoose.Types.ObjectId,
        ref : "User",
        require : true
    },
    settingNotification:{
        status : {type : String , required : true , enum : ["Inactive","Active"],default:"Active"},
        importance : {type : String , required : true ,enum : ["High","Medium","Low"],default:"Medium" },
        repeat :{type : String , required : true ,enum : ["Every day","Every week","Every month"],default:"Every week" }
    },
    message :{

    },
    accessToken: {
        type:String,
        default : "",
        required : false 
    }
},{ timestamps: true })


const settingUser = mongoose.model("SettingUser",schema)


module.exports = settingUser