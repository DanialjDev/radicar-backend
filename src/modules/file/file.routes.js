const express = require("express");
const fileController = require("../file/file.controller");
const { auth } = require("../../middlewares/auth");
const {authPersonnel} =require("../../middlewares/auth.personnel")

const { upload } = require("../../middlewares/multer");

const router = express.Router();


router.route("/upload/user").post(auth, upload.single("file"), fileController.upload);
router.route("/upload/personnel").post(authPersonnel, upload.single("file"), fileController.upload);


router.route("/user").get(auth, fileController.getFiles);
router.route("/personnel").get(authPersonnel, fileController.getFiles);



module.exports = router;
