const express = require('express');
const ticketController = require("../ticket/ticket.controller");
const {auth} =require("../../middlewares/auth.user")
const {authPersonnel} =require("../../middlewares/auth.personnel")

const router = express.Router();


router.route("/").post(auth,ticketController.createTicket)
router.route("/user").get(auth,ticketController.getAllUser)
router.route("/:id/user").get(auth,ticketController.getOneUser)


router.route("/:id/personnel").get(authPersonnel,ticketController.getOnePersonnel)
router.route("/:id/update").put(authPersonnel,ticketController.updateTicket)
router.route("/personnel").get(authPersonnel,ticketController.getAllPersonnel)


module.exports = router
