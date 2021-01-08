import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Dashboard from "./components/dashboard";
import Link from "./components/link";
import Login from "./components/auth";
import Payment from "./components/payment";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={App} />
			<Route path="/auth" component={Login} />
			<ProtectedRoute path="/dashboard" component={Dashboard} />
			<ProtectedRoute path="/createlink" component={Link} />
			<ProtectedRoute path="/payment" component={Payment} />
			<Route path="*" render={() => <h1>404 Page Not Found</h1>} />
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
