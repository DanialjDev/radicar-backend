const express = require('express');
const ticketController = require("../ticket/ticket.controller");
const {auth} =require("../../middlewares/auth.user")
const {authPersonnel} =require("../../middlewares/auth.personnel")

const router = express.Router();


router.route("/").post(auth,ticketController.createTicket)
router.route("/").get(auth,ticketController.getAll)
router.route("/:id").get(auth,ticketController.getOne)
router.route("/:id/update").put(authPersonnel,ticketController.updateTicket)


module.exports = router
