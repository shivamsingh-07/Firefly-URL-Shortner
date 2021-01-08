import React from "react";
import { Container, Button, Menu, MenuItem } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";

class App extends React.Component {
	state = {
		anchorEl: null,
		auth: false,
	};

	handleClick = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	componentDidMount() {
		// Verify Auth
		if (document.cookie)
			axios
				.post("https://firefly-api.glitch.me/auth/verify-token", {
					auth_token: document.cookie.slice(11),
				})
				.then((res) => {
					if (res.status === 200) this.setState({ auth: true });
				});
	}

	render() {
		return (
			<div>
				<Container className="content">
					<nav>
						<span className="logo">FIREFLY</span>
						{this.state.auth ? (
							<>
								<AccountCircleIcon
									fontSize="large"
									aria-controls="simple-menu"
									aria-haspopup="true"
									onClick={this.handleClick}
									style={{ cursor: "pointer" }}
								/>
								<Menu
									id="simple-menu"
									anchorEl={this.state.anchorEl}
									keepMounted
									open={Boolean(this.state.anchorEl)}
									onClose={this.handleClose}
								>
									<MenuItem
										onClick={() => {
											window.location.href = "/dashboard";
											this.handleClose();
										}}
									>
										Dashboard
									</MenuItem>
									<MenuItem
										onClick={() => {
											document.cookie =
												"auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
											window.location.href = "/";
											this.handleClose();
										}}
									>
										Logout
									</MenuItem>
								</Menu>
							</>
						) : (
							<Button variant="outlined" color="default" href="/auth">
								Login
							</Button>
						)}
					</nav>
					<h1>World's Best URL Shortner</h1>
					<Button variant="contained" color="primary" href="/dashboard">
						Get Started
					</Button>
				</Container>

				<div className="hr"></div>

				<Container className="about">
					<h1>Why Choose Us?</h1>
					<div className="features">
						<section className="card">
							<span className="title">Full Security</span>
							<p className="brief">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae veritatis minus
								sequi incidunt rem necessitatibus voluptatibus optio accusamus officiis
								doloribus? Sint iusto dolor quidem. Aliquid tempora iusto tenetur deserunt in.
							</p>
						</section>
						<section className="card">
							<span className="title">Top Performance</span>
							<p className="brief">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae veritatis minus
								sequi incidunt rem necessitatibus voluptatibus optio accusamus officiis
								doloribus? Sint iusto dolor quidem. Aliquid tempora iusto tenetur deserunt in.
							</p>
						</section>
						<section className="card">
							<span className="title">Reliable</span>
							<p className="brief">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae veritatis minus
								sequi incidunt rem necessitatibus voluptatibus optio accusamus officiis
								doloribus? Sint iusto dolor quidem. Aliquid tempora iusto tenetur deserunt in.
							</p>
						</section>
					</div>
				</Container>

				<div className="hr"></div>

				<Container className="about">
					<h1>Pricing</h1>
					<div className="features">
						<section className="card">
							<span className="title">Free</span>
							<ul className="detail">
								<li>Can generate 1 link.</li>
							</ul>
						</section>
						<section className="card">
							<span className="title">₹75</span>
							<ul className="detail">
								<li>Can generate 10 links.</li>
							</ul>
						</section>
						<section className="card">
							<span className="title">₹600</span>
							<ul className="detail">
								<li>Can generate 100 links.</li>
							</ul>
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

export default App;
