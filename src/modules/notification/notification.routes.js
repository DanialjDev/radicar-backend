const express = require('express');
const notificationController = require("./../notification/notification.controller");
const {auth} =require("../../middlewares/auth.user")

const router = express.Router();


router.route("/").get(auth,notificationController.getAll)
router.route("/:id/update").put(auth,notificationController.update)




module.exports = router
