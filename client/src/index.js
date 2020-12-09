import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Landing from "./components/landing";
import Dashboard from "./components/dashboard";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Switch } from "react-router-dom";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={App} />
			<Route path="/home" component={Landing} />
			<Route path="/dashboard" component={Dashboard} />
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
