import React, { Component } from "react";
import {
	Container,
	Button,
	Switch,
	FormControl,
	InputLabel,
	InputAdornment,
	TextField,
	IconButton,
	FilledInput,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";

class login extends Component {
	state = {
		checked: false,
		name: "",
		email: "",
		password: "",
	};

	onRegister = (e) => {
		e.preventDefault();
		axios
			.post("https://firefly-api.glitch.me/auth/register", {
				email: this.state.email,
				name: this.state.name,
				password: this.state.password,
			})
			.then(() => (window.location.href = "/auth"));
	};

	onLogin = (e) => {
		e.preventDefault();
		axios
			.post("https://firefly-api.glitch.me/auth/login", {
				email: this.state.email,
				password: this.state.password,
			})
			.then((res) => {
				var d = new Date();
				d.setTime(d.getTime() + 60 * 60 * 1000);
				document.cookie =
					"auth-token=" + res.data.token + "; expires=" + d.toUTCString() + "; path=/";
				window.location.href = "/";
			});
	};

	render() {
		return (
			<div>
				<Container className="content">
					<nav>
						<span className="logo">FIREFLY</span>
					</nav>
				</Container>

				<Container>
					<div style={{ textAlign: "center" }}>
						<span className="switch">Login</span> &nbsp;
						<Switch
							checked={this.state.checked}
							onChange={(event) => {
								this.setState({ [event.target.name]: event.target.checked });
							}}
							color="primary"
							name="checked"
						/>
						&nbsp;
						<span className="switch">Signup</span>
					</div>

					<div className="auth">
						{/* Login */}
						<section style={{ display: this.state.checked ? "none" : "" }}>
							<span className="title">Login</span>
							<br />
							<br />
							<br />
							<form action="" onSubmit={this.onLogin}>
								<TextField
									type="email"
									label="Email"
									variant="filled"
									className="input"
									onChange={(e) => this.setState({ email: e.target.value })}
								/>
								<br />
								<br />
								<FormControl variant="filled" className="input">
									<InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
									<FilledInput
										type={this.state.showPassword ? "text" : "password"}
										value={this.state.password}
										onChange={(e) => this.setState({ password: e.target.value })}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={(e) =>
														this.setState({
															showPassword: !this.state.showPassword,
														})
													}
													onMouseDown={(event) => event.preventDefault()}
													edge="end"
												>
													{this.state.showPassword ? (
														<Visibility />
													) : (
														<VisibilityOff />
													)}
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl>
								<br />
								<br />
								<br />
								<Button variant="contained" color="primary" type="submit">
									Login
								</Button>
							</form>
						</section>

						{/* Sign Up */}
						<section style={{ display: this.state.checked ? "" : "none" }}>
							<span className="title">Sign Up</span>
							<br />
							<br />
							<br />
							<form action="" onSubmit={this.onRegister}>
								<TextField
									type="text"
									label="Full Name"
									variant="filled"
									className="input"
									onChange={(e) => this.setState({ name: e.target.value })}
								/>
								<br />
								<br />
								<TextField
									type="email"
									label="Email"
									variant="filled"
									className="input"
									onChange={(e) => this.setState({ email: e.target.value })}
								/>
								<br />
								<br />
								<FormControl variant="filled" className="input">
									<InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
									<FilledInput
										type={this.state.showPassword ? "text" : "password"}
										value={this.state.password}
										onChange={(e) => this.setState({ password: e.target.value })}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={(e) =>
														this.setState({
															showPassword: !this.state.showPassword,
														})
													}
													onMouseDown={(event) => event.preventDefault()}
													edge="end"
												>
													{this.state.showPassword ? (
														<Visibility />
													) : (
														<VisibilityOff />
													)}
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl>
								<br />
								<br />
								<br />
								<Button variant="contained" color="primary" type="submit">
									Sign up
								</Button>
							</form>
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

export default login;
