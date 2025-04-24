const express = require('express');
const carAddressController = require("../carAddress/carAddress.controller");
const {auth} =require("../../middlewares/auth.user")
const {authPersonnel} =require("../../middlewares/auth.personnel")

const router = express.Router();


router.route("/add").post(authPersonnel,carAddressController.createCarAddress)
router.route("/").get(authPersonnel,carAddressController.getAllCarAddress)
router.route("/:id").get(authPersonnel,carAddressController.getOne)
router.route("/:id/update").put(authPersonnel,carAddressController.updateCarAddress)
router.route("/:id/remove").delete(authPersonnel,carAddressController.removeCarAddress)


module.exports = router
