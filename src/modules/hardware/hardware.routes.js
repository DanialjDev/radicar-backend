const express = require('express');
const hardwareController = require("../hardware/hardware.controller");
const {auth} =require("../../middlewares/auth.hardware")


const router = express.Router();


router.route("/auth").post(hardwareController.createHardware)
router.route("/").get(auth,hardwareController.getOne)
router.route("/:id/update").put(auth,hardwareController.updateHardware)


module.exports = router