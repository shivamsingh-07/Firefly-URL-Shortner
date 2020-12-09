const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./config/default.json").mongodb;

// Initializing app
const app = express();

// Connect to Database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () =>
	console.log("Database Connected...")
);

// Defining Middlewares
app.use(express.json());
app.use(cors());

// Defining Routes
app.use("/dashboard", require("./routes/dashboard"));
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));
app.use("/auth", require("./routes/auth"));

// Starting app
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Listening at " + PORT));
