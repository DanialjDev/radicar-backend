const express = require('express');
const repairmanController = require("../repairman/repairman.controller");
const {authPersonnel} =require("../../middlewares/auth.personnel")
const {authRepairman} =require("../../middlewares/auth.repairman")

const router = express.Router();


router.route("/login").post(repairmanController.login)
router.route("/").get(authPersonnel,repairmanController.getAll)
router.route("/:id").get(authRepairman,repairmanController.getOne)
router.route("/:id/update").put(authRepairman,repairmanController.updateRepairman)
router.route("/:id/remove").delete(authPersonnel,repairmanController.removeRepairman)


module.exports = router
