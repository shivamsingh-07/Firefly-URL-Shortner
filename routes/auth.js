const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Verify = require("../models/Verify");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mailer = require("../config/mail");

// @route   Register
router.post("/register", async (req, res) => {
	// Existing Email
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send("Email already exists!");

	// Hashing Password
	const salt = await bcrypt.genSalt(10);
	const pass = await bcrypt.hash(req.body.password, salt);

	// Creating user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: pass,
		account_type: 0,
	});

	try {
		const newUser = await user.save();
		res.status(200).send(newUser);
		mailer(req.body.email);
	} catch (error) {
		res.status(400).send(err);
	}
});

// @route   Login
router.post("/login", async (req, res) => {
	// Checking Account
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("Email or password is wrong.");

	// Checking password
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send("Invalid Password!");

	if (!user.is_verified) return res.send("Please verify your email first!");

	// Assigning JWT Token
	const token = jwt.sign({ user: user._id }, "abstergogaming");
	res.header("auth-token", token).send(token);
});

// @route   Verification
router.get("/verify/:hash", (req, res) => {
	const id = req.params.hash;

	Verify.findOne({ code: id }, (err, data) => {
		if (err) throw err;
		if (!data) return res.end("URL already used.");

		jwt.verify(id, data.otp, (err, info) => {
			if (err) return res.end("Error Occured: Invalid Token");

			// Verifying Account
			User.findOne({ email: data.user }, (err, obj) => {
				if (err) return res.status(500).end(err);
				if (!obj) return res.status(404).end("Data not found!");
				obj.is_verified = true;
				obj.save((err, body) => {
					if (err) return res.status(500).send(err);
				});

				// Deleting Auth Token
				Verify.deleteOne({ code: id }, (err, obj) => {
					if (err) return res.status(500).send(err);
					res.end();
				});

				res.send(data.user + " is verified.");
			});
		});
	});
});

module.exports = router;
