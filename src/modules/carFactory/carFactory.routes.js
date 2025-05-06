const express = require('express');
const carFactoryController = require("../carFactory/carFactory.controller");
const {auth} =require("../../middlewares/auth.user")
const {authPersonnel} =require("../../middlewares/auth.personnel")

const router = express.Router();


router.route("/add").post(authPersonnel,carFactoryController.createCarFactory)
router.route("/").get(authPersonnel,carFactoryController.getAllCarFactory)
router.route("/").get(auth,carFactoryController.getAllCarFactory)
router.route("/:id").get(authPersonnel,carFactoryController.getOne)
router.route("/:id/update").put(authPersonnel,carFactoryController.updateCarFactory)
router.route("/:id/remove").delete(authPersonnel,carFactoryController.removeCarFactory)


module.exports = router
