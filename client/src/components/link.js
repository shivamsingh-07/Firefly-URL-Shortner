import React, { Component } from "react";
import { Container, Button, TextField, Typography } from "@material-ui/core";
import axios from "axios";

class link extends Component {
	state = {
		name: "",
		url: "",
	};

	createLink = (event) => {
		event.preventDefault();
		axios
			.post("https://firefly-api.glitch.me/api/url/shorten", {
				urlName: this.state.name,
				longUrl: this.state.url,
				auth: document.cookie.slice(11),
			})
			.then(() => (window.location.href = "/dashboard"));
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
					<Typography variant="h1">Create Short URL</Typography>
					<br />
					<br />
					<br />
					<form action="" onSubmit={this.createLink}>
						<TextField
							id="filled-basic"
							label="Link Name"
							variant="filled"
							className="input"
							onChange={(e) => this.setState({ name: e.target.value })}
						/>
						<br />
						<br />
						<TextField
							id="filled-basic"
							label="Website URL"
							variant="filled"
							className="input"
							onChange={(e) => this.setState({ url: e.target.value })}
						/>
						<br />
						<br />
						<br />
						<Button variant="contained" color="primary" type="submit">
							Generate
						</Button>
					</form>
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

export default link;
