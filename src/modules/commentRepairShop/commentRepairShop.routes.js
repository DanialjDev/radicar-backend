const express = require("express");
const commentRepairShopController = require("./commentRepairShop.controller");
const { authPersonnel } = require("../../middlewares/authPersonnel");
const { auth } = require("../../middlewares/auth.user");
const { authRepairman } = require("../../middlewares/auth.repairman");

const router = express.Router();


router.route("/user").get(auth, commentRepairShopController.getCommentRepairShopByUser);
router.route("/add").post(auth, commentRepairShopController.addCommentRepairShopByUser);

router.route("/repairman").get(authRepairman, commentRepairShopController.getCommentRepairShopByRepairman);
router.route("reply/repairman").post(authRepairman, commentRepairShopController.replyCommentRepairShopByRepairman);

router.route("/personnel").get(authPersonnel, commentRepairShopController.getCommentRepairShopByPersonnel);
router.route("/:id/update/personnel").put(authPersonnel, commentRepairShopController.updateCommentRepairShopByPersonnel);

module.exports = router;