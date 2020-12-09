const express = require("express");
const router = express.Router();

const URL = require("../models/Url");
const TURL = require("../models/temp_url");

// @route   GET /:code
router.get("/:code", async (req, res) => {
	try {
		if (await URL.findOne({ urlCode: req.params.code })) {
			const url = await URL.findOne({ urlCode: req.params.code });
			return res.redirect(url.longUrl);
		} else if (await TURL.findOne({ urlCode: req.params.code })) {
			const url = await TURL.findOne({ urlCode: req.params.code });
			return res.redirect(url.longUrl);
		} else return res.status(404).send("No URL Found!!");
	} catch (error) {
		res.status(500).send("Server Error at redirecting.");
	}
});

// React Route
router.get("/", (req, res) => {
	res.json("Working Backend :)");
});

module.exports = router;
