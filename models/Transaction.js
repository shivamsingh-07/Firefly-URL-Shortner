const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
	uID: String,
	orderID: String,
	txnID: String,
	txnAmt: Number,
	paymentMode: String,
	currency: String,
	bankTxnID: Number,
	bankName: String,
	txnStatus: String,
	date: { type: String, default: new Date() },
});

module.exports = mongoose.model("transactions", transactionSchema);
