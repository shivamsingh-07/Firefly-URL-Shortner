const express = require("express");
const router = express.Router();
const TXN = require("../models/Transaction");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// @route    GET /fetch
router.post("/fetch", async (req, res) => {
	const uid = jwt.decode(req.body.auth).user;
	let txn = await TXN.find({ uID: uid, txnStatus: "TXN_SUCCESS" });
	res.status(200).send(txn);
});

module.exports = router;
