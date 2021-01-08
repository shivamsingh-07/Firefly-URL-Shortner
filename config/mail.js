const nodemailer = require("nodemailer");
const details = require("./default.json");
const id = require("shortid");
const jwt = require("jsonwebtoken");
const Verify = require("../models/Verify");

let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: details.email,
		pass: details.pass,
	},
});

module.exports = async (reciever) => {
	const OTP = id.generate();
	const hash = jwt.sign({ user: reciever }, OTP);

	let mail = {
		from: details.email,
		to: reciever,
		subject: "Verify Your Account",
		html: `<a href=${"http://localhost:5000/auth/verify/" + hash}>Verify</a>`,
	};

	let verification = new Verify({
		user: reciever,
		otp: OTP,
		code: hash,
	});

	await verification.save();
	transporter.sendMail(mail, (err, info) => {
		if (err) throw err;
		return info;
	});
};
