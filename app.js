const express = require("express");
const path = require("path");
const cors = require("cors");
const cron = require('node-cron');
const { deactivateExpiredCars } = require('./src/utiles/deactivateExpiredCars/deactivateExpiredCars');
const { increaseCarsKilometers } = require('./src/utiles/updateCarKilometers');
const cookieParser = require("cookie-parser");
const socketIoConnection = require("./src/utiles/socketConnection");
const socketHandler = require("./src/socket.io/index");
const http = require("http");

const userRoutes = require("./src/modules/user/user.routes");
const settingUserRoutes = require("./src/modules/settingUser/settingUser.routes");
const personnelRoutes = require("./src/modules/personnel/personnel.routes");
const otpRoutes = require("./src/modules/otp/otp.routes");
const ticketRoutes = require("./src/modules/ticket/ticket.routes");
const messageRoutes = require("./src/modules/message/message.routes");
const carFactoryRoutes = require("./src/modules/carFactory/carFactory.routes");
const carAddressRoutes = require("./src/modules/carAddress/carAddress.routes");
const carTechniacalRoutes = require("./src/modules/carTeschnical/carTeschnical.routes");
const carModelRoutes = require("./src/modules/carModel/carModel.routes");
const hardwareRoutes = require("./src/modules/hardware/hardware.routes");
const categoryTechnicalRoutes = require("./src/modules/CategoryTechnical/categoryTechnical.routes");
const carRoutes = require("./src/modules/car/car.routes");
const settingTechnicalRoutes = require("./src/modules/settingTechnical/settingTechnical.routes");
const notificationRoutes = require("./src/modules/notification/notification.routes");
const fileRoutes = require("./src/modules/file/file.routes");
const repairmanRoutes = require("./src/modules/repairman/repairman.routes");
const subscriptionRoutes = require("./src/modules/subscription/subscription.routes");

require("dotenv").config();
require("./configs/db");

const app = express();


// Body parser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

// Cookie parser
app.use(cookieParser());

// CORS policy
app.use(cors());

// Routes
app.use("/user", userRoutes);
app.use("/usersetting", settingUserRoutes);
app.use("/personnel", personnelRoutes);
app.use("/ticket", ticketRoutes);
app.use("/otp", otpRoutes);
app.use("/message", messageRoutes);
app.use("/carFactory", carFactoryRoutes);
app.use("/carAddress", carAddressRoutes);
app.use("/carTechniacal", carTechniacalRoutes);
app.use("/carModel", carModelRoutes);
app.use("/hardware", hardwareRoutes);
app.use("/categoryTechnical", categoryTechnicalRoutes);
app.use("/car", carRoutes);
app.use("/settingTechnical", settingTechnicalRoutes);
app.use("/notification", notificationRoutes);
app.use("/file", fileRoutes);
app.use("/repairman", repairmanRoutes);
app.use("/subscription", subscriptionRoutes);

// 404 error handler
app.use((req, res) => {
    console.log("this path not found", req.path);
    return res.status(404).json({ message: "url not found" });
});

// Cron jobs
cron.schedule('* * * * *', () => {
    deactivateExpiredCars();
});

cron.schedule('* * * * *', () => {
    increaseCarsKilometers();
});




const port =  3000;
const httpServer = http.createServer(app);
const io = socketIoConnection(httpServer);
socketHandler(io);
httpServer.on("error", (err) => {
  console.error("HTTP server error:", err);
});
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});