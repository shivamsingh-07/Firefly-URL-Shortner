const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./config/default.json").mongodb;
const ejs = require("ejs");
const bodyParser = require("body-parser");

// Initializing app
const app = express();

// Connect to Database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () =>
	console.log("Database Connected...")
);

// Defining Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"], credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");

// Defining Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));
app.use("/api/transaction", require("./routes/transaction"));
app.use("/auth", require("./routes/auth"));
app.use("/gateway", require("./routes/gateway"));

// Starting app
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Listening at " + PORT));
