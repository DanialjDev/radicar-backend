const express = require('express');
const carModelController = require("../carModel/carModel.controller");
const {auth} =require("../../middlewares/auth.user")
const {authPersonnel} =require("../../middlewares/auth.personnel")

const router = express.Router();


router.route("/add").post(authPersonnel,carModelController.createCarmodel)
router.route("/").get(authPersonnel,carModelController.getAllCarmodel)
router.route("/:id").get(authPersonnel,carModelController.getOne)
router.route("/:id/update").put(authPersonnel,carModelController.updateCarmodel)
router.route("/:id/remove").delete(authPersonnel,carModelController.removeCarmodel)


module.exports = router
