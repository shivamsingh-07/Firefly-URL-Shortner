const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const URL = require("../models/Url");
const jwt = require("jsonwebtoken");

// @route	GET /search
router.post("/search", async (req, res) => {
	let uid = jwt.decode(req.body.auth).user;
	let data = await URL.find({ uID: uid });
	res.status(200).send(data);
});

// @route   POST /api/url/shorten
router.post("/shorten", async (req, res) => {
	const { longUrl, urlName, auth } = req.body;
	const baseUrl = require("../config/default.json").baseUrl;

	if (!validUrl.isUri(baseUrl)) return res.status(401).send("Invalid Base URL");

	// check long url
	if (validUrl.isUri(longUrl)) {
		try {
			let url = await URL.findOne({ longUrl, uID: jwt.decode(auth).user });

			if (url) res.send(url);
			else {
				// create url code
				const urlCode = shortid.generate();
				const shortUrl = baseUrl + "/" + urlCode;

				url = new URL({
					uID: jwt.decode(auth).user,
					urlName,
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
		res.status(400).send("Invalid Base URL");
	}
});

module.exports = router;
