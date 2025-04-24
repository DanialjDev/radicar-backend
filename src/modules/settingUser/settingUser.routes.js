const express = require('express');
const settingUserController = require("../settingUser/settingUser.controller");
const {auth} =require("../../middlewares/auth.user")

const router = express.Router();


router.route("/").get(auth,settingUserController.getOne)
router.route("/update").put(auth,settingUserController.updateSettingUser)


module.exports = router
