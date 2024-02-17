const express = require("express");
const router = express.Router();
const {isAuthenticatedUser, authorizedRoles,} = require("../middleware/auth");
const { newOrder } = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticatedUser,newOrder);

module.exports = router;