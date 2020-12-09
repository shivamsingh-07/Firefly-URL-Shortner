const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
	urlCode: String,
	longUrl: String,
	shortUrl: String,
	date: { type: String, default: Date.now },
	expire_at: { type: Date, default: Date.now, expires: 30 },
});

module.exports = mongoose.model("temp-links", urlSchema);
