const express = require("express");
const router = express.Router();
const URL = require("../models/Url");

// @route   GET /:code
router.get("/:code", async (req, res) => {
	try {
		await URL.findOne({ urlCode: req.params.code });
		const url = await URL.findOne({ urlCode: req.params.code });
		return res.redirect(url.longUrl);
	} catch (error) {
		res.status(500).send("Server Error at redirecting.");
	}
});

// React Route
router.get("/", (req, res) => {
	res.redirect("http://localhost:3000/");
});

module.exports = router;
