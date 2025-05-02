const express = require('express');
const personnelController = require("../personnel/personnel.controller");
const {auth} =require("../../middlewares/auth.user")
const {authPersonnel} =require("../../middlewares/auth.personnel")

const router = express.Router();


router.route("/register").post(personnelController.register)
router.route("/").get(authPersonnel,personnelController.getAll)
router.route("/:id").get(auth,personnelController.getOne)
router.route("/login").post(personnelController.login)
router.route("/:id/update").put(auth,personnelController.updatepersonnel)
router.route("/:id/remove").delete(auth,personnelController.removepersonnel)


module.exports = router
