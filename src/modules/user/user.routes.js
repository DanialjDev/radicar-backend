const express = require('express');
const userController = require("./../user/user.controller");
const {auth} =require("../../middlewares/auth.user")

const router = express.Router();


router.route("/register").post(userController.register)
router.route("/login").post(userController.login)
router.route("/reset").put(userController.resetPassword)
router.route("/:id/update").put(userController.updateUser)





module.exports = router
