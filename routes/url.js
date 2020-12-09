const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");

const URL = require("../models/temp_url");

// @route   POST /api/url/shortid
router.post("/shorten", async (req, res) => {
	const { longUrl } = req.body;
	const baseUrl = require("../config/default.json").baseUrl;

	if (!validUrl.isUri(baseUrl)) return res.status(401).send("Invalid Base URL");

	// create url code
	const urlCode = shortid.generate();

	// check long url
	if (validUrl.isUri(longUrl)) {
		try {
			let url = await URL.findOne({ longUrl });

			if (url) res.send(url);
			else {
				const shortUrl = baseUrl + "/" + urlCode;

				url = new URL({
					longUrl,
					shortUrl,
					urlCode,
					date: new Date(),
				});
				await url.save();
			}
		} catch (error) {
			console.error(error);
			res.status(500).send("Server Error at long url.");
		}
	} else {
		res.status(401).send("Invalid Base URL");
	}
});

module.exports = router;
