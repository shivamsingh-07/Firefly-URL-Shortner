const express = require("express");
const router = express.Router();
const { initPayment, responsePayment } = require("../paytm/services/index");
const config = require("../paytm/config");
const TXN = require("../models/Transaction");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
let userID = null;
let userName = null;

router.get("/payment", (req, res) => {
	userID = req.query.auth;
	initPayment(req.query.amount).then(
		(success) => {
			res.render("paytmRedirect.ejs", {
				resultData: success,
				paytmFinalUrl: config.PAYTM_FINAL_URL,
			});
		},
		(error) => {
			res.send(error);
		}
	);
});

router.post("/transaction", (req, res) => {
	responsePayment(req.body).then(
		async (success) => {
			const payment = new TXN({
				uID: jwt.decode(userID).user,
				orderID: success.ORDERID,
				txnID: success.TXNID,
				txnAmt: success.TXNAMOUNT,
				paymentMode: success.PAYMENTMODE,
				currency: success.CURRENCY,
				bankTxnID: success.BANKTXNID,
				bankName: success.BANKID,
				txnStatus: success.STATUS,
			});

			await payment.save();

			await User.findOne({ _id: jwt.decode(userID).user }, async (err, data) => {
				userName = data.name;
				if (success.STATUS === "TXN_SUCCESS") {
					if (parseInt(success.TXNAMOUNT) === 75) data.balance += 10;
					else if (parseInt(success.TXNAMOUNT) === 600) data.balance += 100;
					await data.save();
				}
			});

			res.render("response.ejs", { resultData: "true", responseData: success, user: userName });
		},
		(error) => {
			res.send(error);
		}
	);
});

module.exports = router;
