const express = require('express');
const hardwareController = require("../hardware/hardware.controller");
const {auth} =require("../../middlewares/auth.user")
const {authPersonnel} =require("../../middlewares/auth.personnel")

const router = express.Router();


router.route("/auth").post(authPersonnel,hardwareController.createHardware)
router.route("/auth").get(authPersonnel,hardwareController.getOne)
router.route("/:id/update").put(authPersonnel,hardwareController.updateHardware)


module.exports = router