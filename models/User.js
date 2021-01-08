const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	account_type: Number,
	balance: { type: Number, default: 1 },
	is_verified: { type: Boolean, default: false },
	created_on: { type: String, default: new Date() },
});

module.exports = mongoose.model("users", UserSchema);
