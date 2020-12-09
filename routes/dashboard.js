const express = require("express");
const router = express.Router();
const validateUser = require("../config/verifyToken");

router.get("/", validateUser, (req, res) => {
	res.send("User Dashboard");
});

module.exports = router;
