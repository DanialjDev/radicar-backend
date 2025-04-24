const mongoose = require('mongoose');
require("dotenv").config();

const dbUrl = process.env.MONGO_URI;

mongoose
    // .connect("mongodb://root:yDkI0r0OTJQpMnXoJlpx88nc@grand-teton.liara.cloud:33396/my-app?authSource=admin",{
    //     authSource : "admin"    })
    .connect(dbUrl)
    .then(() => console.log("Server Connected To DB Successfully"))
    .catch((err) => console.log("err =>", err));
