const express = require("express");
const path = require("path");
const cors = require("cors");

// const moment = require('moment');

const cookieParser = require("cookie-parser")

const userRoutes = require("./src/modules/user/user.routes")
const settingUserRoutes = require("./src/modules/settingUser/settingUser.routes")
const personnelRoutes = require("./src/modules/personnel/personnel.routes")
const otpRoutes = require("./src/modules/otp/otp.routes")
const ticketRoutes = require("./src/modules/ticket/ticket.routes")
const messageRoutes = require("./src/modules/message/message.routes")
const carFactoryRoutes = require("./src/modules/carFactory/carFactory.routes")
const carAddressRoutes = require("./src/modules/carAddress/carAddress.routes")
const carTechniacalRoutes = require("./src/modules/carTeschnical/carTeschnical.routes")
const carModelRoutes = require("./src/modules/carModel/carModel.routes")
const hardwareRoutes = require("./src/modules/hardware/hardware.routes")
const categoryTechnicalRoutes = require("./src/modules/CategoryTechnical/categoryTechnical.routes")
const carRoutes = require("./src/modules/car/car.routes")


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
app.use("/usersetting", settingUserRoutes)
app.use("/personnel", personnelRoutes)
app.use("/ticket", ticketRoutes)
app.use("/otp", otpRoutes)
app.use("/message", messageRoutes)
app.use("/carFactory", carFactoryRoutes)
app.use("/carAddress", carAddressRoutes)
app.use("/carTechniacal", carTechniacalRoutes)
app.use("/carModel", carModelRoutes)
app.use("/hardware", hardwareRoutes)
app.use("/categoryTechnical", categoryTechnicalRoutes)
app.use("/car", carRoutes)


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





