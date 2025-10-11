const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/gift.controller");


router.get("/:id", controller.gift);


module.exports = router;