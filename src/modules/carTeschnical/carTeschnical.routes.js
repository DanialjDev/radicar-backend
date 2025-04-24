const express = require('express');
const carTechniacalController = require("../carTeschnical/carTeschnical.controller");
const {auth} =require("../../middlewares/auth.user")
const {authPersonnel} =require("../../middlewares/auth.personnel")

const router = express.Router();


router.route("/add").post(authPersonnel,carTechniacalController.createCarTechniacal)
router.route("/").get(authPersonnel,carTechniacalController.getAllCarTechniacal)
router.route("/:id").get(authPersonnel,carTechniacalController.getOne)
router.route("/:id/update").put(authPersonnel,carTechniacalController.updateCarTechniacal)
router.route("/:id/remove").delete(authPersonnel,carTechniacalController.removeCarTechniacal)


module.exports = router
