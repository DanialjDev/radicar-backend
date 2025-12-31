const express = require("express");
const subscriptionController = require("./subscription.controller");
const { authPersonnel } = require("../../middlewares/authPersonnel");
const { auth } = require("../../middlewares/auth.user");
const { authRepairman } = require("../../middlewares/auth.repairman");

const router = express.Router();

router.route("/").get(authPersonnel, subscriptionController.getSubscription);
router.route("/:id").get(authPersonnel, subscriptionController.getSubscriptionById);
router.route("/add").post(authPersonnel, subscriptionController.addSubscription);
router.route("/:id/remove").delete(authPersonnel, subscriptionController.removeSubscription);
router.route("/:id/update").put(authPersonnel, subscriptionController.updateSubscription);

router.route("/user").get(auth, subscriptionController.getSubscriptionUser);
router.route("/:id/user").get(auth, subscriptionController.getSubscriptionByIdUser);

router.route("/repairman").get(authRepairman, subscriptionController.getSubscriptionRepairman);
router.route("/:id/repairman").get(authRepairman, subscriptionController.getSubscriptionByIdRepairman);

module.exports = router;