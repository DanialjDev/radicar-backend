const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateAccessToken =  (_id) => {
    const accessToken =  jwt.sign({_id},process.env.JWT_SECRET,{
        expiresIn : "8h"
    })
    return accessToken
}

const generateRefreshToken =  (_id) => {
    const refreshToken =  jwt.sign({_id},process.env.JWT_REFRESH_SECRET,{
        expiresIn : "8h"
    })
    return refreshToken
}
module.exports = {
    generateAccessToken,
    generateRefreshToken
}