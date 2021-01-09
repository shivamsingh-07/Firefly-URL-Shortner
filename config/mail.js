const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const details = require("./default.json");
const id = require("shortid");
const jwt = require("jsonwebtoken");
const Verify = require("../models/Verify");

const oAuth2Client = new google.auth.OAuth2(details.CLIENT_ID, details.CLIENT_SECRET, details.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: details.REFRESH_TOKEN });

module.exports = async (reciever) => {
	const OTP = id.generate();
	const hash = jwt.sign({ user: reciever }, OTP);

	let mail = {
		from: "Firefly URL Shortner <testingkeylogger171@gmail.com>",
		to: reciever,
		subject: "Verify Your Account",
		html: `<a href=${"http://localhost:5000/auth/verify/" + hash}>Verify</a>`,
	};

	let verification = new Verify({
		user: reciever,
		otp: OTP,
		code: hash,
	});

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: "testingkeylogger171@gmail.com",
			clientId: details.CLIENT_ID,
			clientSecret: details.CLIENT_SECRET,
			refreshToken: details.REFRESH_TOKEN,
			accessToken: await oAuth2Client.getAccessToken(),
		},
	});

	transporter.sendMail(mail, async (err, info) => {
		if (err) throw err;
		await verification.save();
		return info;
	});
};
