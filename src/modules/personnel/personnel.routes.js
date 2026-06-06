const express = require('express');
const personnelController = require("../personnel/personnel.controller");
const {authPersonnel} =require("../../middlewares/auth.personnel")

const router = express.Router();


router.route("/register").post(personnelController.register)
router.route("/login").post(personnelController.login)
router.route("/").get(authPersonnel,personnelController.getAll)
router.route("/:id").get(authPersonnel,personnelController.getOne)
router.route("/:id/update").put(authPersonnel,personnelController.updatepersonnel)
router.route("/:id/remove").delete(authPersonnel,personnelController.removepersonnel)


module.exports = router
