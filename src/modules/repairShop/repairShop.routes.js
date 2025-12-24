const express = require('express');
const repairShopController = require("../repairShop/repairShop.controller");
const {auth} =require("../../middlewares/auth.user")
const {authRepairman} =require("../../middlewares/auth.repairman")

const router = express.Router();


router.route("/:id").get(authRepairman,repairShopController.getOne)
router.route("/:id/update").put(authRepairman,repairShopController.updateCarAddress)



module.exports = router
