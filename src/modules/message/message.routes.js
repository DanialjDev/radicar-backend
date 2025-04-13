const express = require('express');
const messageController = require("../message/message.controller");
const {auth} =require("../../middlewares/auth.user")
const {authPersonnel} =require("../../middlewares/auth.personnel")

const router = express.Router();


router.route("/user").post(auth,messageController.createMessageUser)
router.route("/personnel").post(authPersonnel,messageController.createMessagePersonnel)
router.route("/ticket/:id").get(messageController.getOne)


module.exports = router