const express = require('express');
const userController = require("./../user/user.controller");
const {auth} =require("../../middlewares/auth.user")
const {authPersonnel} =require("../../middlewares/auth.personnel")

const router = express.Router();


router.route("/register").post(userController.register)
router.route("/login").post(userController.login)

router.route("/:id/update").put(auth,userController.updateUser)

router.route("/").get(authPersonnel,userController.getAll)
router.route("/reset").put(authPersonnel,userController.resetPassword)





module.exports = router
