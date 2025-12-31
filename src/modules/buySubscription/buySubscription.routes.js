const express = require("express");
const BuySubscriptionController = require("./buySubscription.controller");
const { authRepairman } = require("../../middlewares/auth.repairman");
const { authPersonnel } = require("../../middlewares/auth.personnel");
const { auth } = require("../../middlewares/auth.user");

const router = express.Router();

router.route("/").get(authRepairman, BuySubscriptionController.getBuySubscription);
router.route("/:id").get(authRepairman, BuySubscriptionController.getBuySubscriptionById);

router.route("/personnel").get(authPersonnel, BuySubscriptionController.getBuySubscriptionPersonnel);
router.route("/:id/personnel").get(authPersonnel, BuySubscriptionController.getBuySubscriptionByIdPersonnel);

router.route("/user").get(auth, BuySubscriptionController.getBuySubscriptionUser);
router.route("/:id/user").get(auth, BuySubscriptionController.getBuySubscriptionByIdUser);


module.exports = router;