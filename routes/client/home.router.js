const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/home.controller");
// const multer = require('multer')
// const uploadStream = require('../../helpers/uploadStream');

// const upload = multer();

router.get("/", controller.index);


module.exports = router;