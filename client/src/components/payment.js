import React, { Component } from "react";
import { Container, Button } from "@material-ui/core";

class payment extends Component {
	startPayment = (amount) => {
		window.open(
			"https://firefly-api.glitch.me/gateway/payment?amount=" +
				amount +
				"&auth=" +
				document.cookie.slice(11),
			"Payment Gateway",
			"toolbar=no,status=no,resizable=1,scrollbars=1,menubar=no,location=no,width=" +
				window.innerWidth +
				",height=" +
				window.innerHeight
		);
		window.location.href = "/dashboard";
	};

	render() {
		return (
			<div>
				<Container className="content">
					<nav>
						<span className="logo">FIREFLY</span>
					</nav>
				</Container>

				<Container className="about">
					<h1>Pricing</h1>
					<div className="features">
						<section className="card">
							<span className="title">₹75</span>
							<ul className="detail">
								<li>Can generate 10 links.</li>
								<li>Link will not expire.</li>
							</ul>
							<Button
								variant="outlined"
								color="primary"
								onClick={() => this.startPayment("75")}
							>
								Pay
							</Button>
						</section>
						<section className="card">
							<span className="title">₹600</span>
							<ul className="detail">
								<li>Can generate 100 links.</li>
								<li>Link will not expire.</li>
							</ul>
							<Button
								variant="outlined"
								color="primary"
								onClick={() => this.startPayment("600")}
							>
								Pay
							</Button>
						</section>
					</div>
				</Container>

				<div className="hr"></div>

				<footer>
					<span className="logo">FIREFLY</span>
					<span>Copyright &copy; 2020 | Designed By Shivam</span>
				</footer>
			</div>
		);
	}
}

export default payment;
