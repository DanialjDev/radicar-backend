const express = require('express');
const categoryTechnicalController = require("./categoryTechnical.controller");
const {auth} =require("../../middlewares/auth.user")
const {authPersonnel} =require("../../middlewares/auth.personnel")

const router = express.Router();


router.route("/add").post(authPersonnel,categoryTechnicalController.createCategoryTechnical)
router.route("/").get(authPersonnel,categoryTechnicalController.getAllCategoryTechnical)
router.route("/:id").get(authPersonnel,categoryTechnicalController.getOne)
router.route("/:id/update").put(authPersonnel,categoryTechnicalController.updateCategoryTechnical)
router.route("/:id/remove").delete(authPersonnel,categoryTechnicalController.removeCategoryTechnical)


module.exports = router
