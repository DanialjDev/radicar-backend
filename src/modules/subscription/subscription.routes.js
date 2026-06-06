const express = require("express");
const subscriptionController = require("./subscription.controller");
const { authPersonnel } = require("../../middlewares/auth.personnel");
const { auth } = require("../../middlewares/auth.user");
const { authRepairman } = require("../../middlewares/auth.repairman");

const router = express.Router();

router.route("/add").post(authPersonnel, subscriptionController.addSubscription);
router.route("/user").get(auth, subscriptionController.getSubscriptionUser);
router.route("/repairman").get(authRepairman, subscriptionController.getSubscriptionRepairman);
router.route("/:id/user").get(auth, subscriptionController.getSubscriptionByIdUser);
router.route("/:id/repairman").get(authRepairman, subscriptionController.getSubscriptionByIdRepairman);
router.route("/").get(authPersonnel, subscriptionController.getSubscription);
router.route("/:id").get(authPersonnel, subscriptionController.getSubscriptionById);
router.route("/:id/remove").delete(authPersonnel, subscriptionController.removeSubscription);
router.route("/:id/update").put(authPersonnel, subscriptionController.updateSubscription);

module.exports = router;
