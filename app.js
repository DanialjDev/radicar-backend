const express = require("express");
const path = require("path");
const cors = require("cors");

// const moment = require('moment');

const cookieParser = require("cookie-parser")

const userRoutes = require("./src/modules/user/user.routes")
const otpRoutes = require("./src/modules/otp/otp.routes")


require("dotenv").config()
require("./configs/db")

const app = express();

//body parser
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(express.json({ limit: "50mb" }))



//cookie parser
app.use(cookieParser())

//cors policy
app.use(cors());


//Routes
app.use("/user", userRoutes)
app.use("/otp", otpRoutes)


//404 error 
app.use((req, res) => {
    console.log("this path not found", req.path);
    return res.status(404).json({ message: "url not found" })
})

const port = process.env.PORT
app.listen(port, (err) => {
    if (err) {
        console.log("error", err);
    } else {
        console.log(`connected to port ${port}`);
    }
})





