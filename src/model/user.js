const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const schema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    password:{
        type: String, 
        required : true
    },
    phoneNumber :{
        type:String,
        unique: true,
        required : true
    },
    accessToken: {
        type:String,
        default : "",
        required : false 
    },
    isAcceptNotification :{
        type:Boolean,
        default : false
    }
},{ timestamps: true })


schema.pre("save" ,  function (){
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password,salt)

})

schema.pre("update" ,  function (){
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password,salt)

})
const user = mongoose.model("User",schema)


module.exports = user