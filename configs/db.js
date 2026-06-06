const mongoose = require('mongoose');
require("dotenv").config();
const { seedDefaultAccounts } = require("../src/utiles/seedDefaultAccounts/seedDefaultAccounts");

const dbUrl = process.env.MONGO_URI;

if (!dbUrl) {
    console.error("MONGO_URI is not defined in environment variables");
    process.exit(1);
}

const connectOptions = {};
if (dbUrl.includes("@") && !dbUrl.includes("authSource=")) {
    connectOptions.authSource = "admin";
}

mongoose
    .connect(dbUrl, connectOptions)
    .then(async () => {
        console.log("Server Connected To DB Successfully");
        await seedDefaultAccounts();
    })
    .catch((err) => console.log("err =>", err));
