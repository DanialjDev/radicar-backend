const express = require('express');
const categoryTechnicalController = require("./car.controller");
const {auth} =require("../../middlewares/auth.user")

const router = express.Router();


router.route("/add").post(auth,categoryTechnicalController.createCar)
router.route("/check").post(auth,categoryTechnicalController.checkSimCard)
router.route("/").get(auth,categoryTechnicalController.getAllCar)
router.route("/:id").get(auth,categoryTechnicalController.getOne)
router.route("/:id/update").put(auth,categoryTechnicalController.updateCar)
router.route("/:id/remove").delete(auth,categoryTechnicalController.removeCar)


module.exports = router
