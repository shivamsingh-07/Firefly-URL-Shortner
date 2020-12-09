const mongoose = require("mongoose");

const verifySchema = new mongoose.Schema({
	user: String,
	otp: String,
	code: String,
	date: { type: String, default: new Date() },
	expire_at: { type: Date, default: Date.now, expires: 86400 },
});

module.exports = mongoose.model("verification", verifySchema);
