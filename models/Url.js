const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
	uID: String,
	urlName: String,
	urlCode: String,
	longUrl: String,
	shortUrl: String,
	date: { type: String, default: new Date() },
});

module.exports = mongoose.model("links", urlSchema);
