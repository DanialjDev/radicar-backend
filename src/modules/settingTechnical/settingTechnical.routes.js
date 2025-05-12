const express = require('express');
const settingTechnicalController = require("../settingTechnical/settingTechnical.controller");
const {auth} =require("../../middlewares/auth.user")


const router = express.Router();


router.route("/increment").get(auth,settingTechnicalController.getAllIncrement)
router.route("/current").get(auth,settingTechnicalController.getAllCurrent)
router.route("/update-increment").put(auth,settingTechnicalController.updateSettingTechnicalIncrement)
router.route("/update-current").put(auth,settingTechnicalController.updateSettingTechnicalCurrent)


module.exports = router