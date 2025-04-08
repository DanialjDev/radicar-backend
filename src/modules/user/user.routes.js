const express = require('express');
const userController = require("./../user/user.controller");

const router = express.Router();


router.route("/register").post(userController.register)
router.route("/login").post(userController.login)
router.route("/reset").put(userController.resetPassword)





module.exports = router
