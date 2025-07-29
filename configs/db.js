const mongoose = require('mongoose');
require("dotenv").config();

const dbUrl = process.env.MONGO_URI;

mongoose
    // .connect("mongodb://root:mTuaaUbJfk3c4JfVLebRHadg@kamet.liara.cloud:30486/my-app?authSource=admin",{
    //     authSource : "admin"    })
    .connect(dbUrl)
    .then(() => console.log("Server Connected To DB Successfully"))
    .catch((err) => console.log("err =>", err));
