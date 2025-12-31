const mongoose = require('mongoose');
require("dotenv").config();

const dbUrl = process.env.MONGO_URI;

mongoose
    .connect("mongodb://root:MjcJTj8PEUdyUt315KSbMzOG@kazbek.liara.cloud:32287/my-app?authSource=admin",{
        authSource : "admin"    })
    // .connect(dbUrl)
    .then(() => console.log("Server Connected To DB Successfully"))
    .catch((err) => console.log("err =>", err));
