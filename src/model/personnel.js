const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const schema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    username: {
        type : String,
        unique: true,
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
    email:{
        type : String,
        required : false
    },
    role:{
        type : String,
        enum : ["Admin","Personnel"],
        default : "Personnel",
        required : false
    },
    accessToken: {
        type:String,
        default : "",
        required : false 
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
const personnel = mongoose.model("Personnel",schema)


module.exports = personnel