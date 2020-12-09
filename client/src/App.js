import React from "react";
import { Container, Button, Menu, MenuItem } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

class App extends React.Component {
	state = {
		anchorEl: null,
	};

	setAnchorEl = () => {};

	handleClick = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		return (
			<div>
				<Container className="content">
					<nav>
						<span className="logo">FIREFLY</span>
						<Button
							variant="outlined"
							color="default"
							onClick={() => (window.location.href = "/dashboard")}
						>
							Login
						</Button>
						{/* <AccountCircleIcon
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
							open={this.state.anchorEl}
							onClose={this.handleClose}
						>
							<MenuItem onClick={this.handleClose}>Dashboard</MenuItem>
							<MenuItem onClick={this.handleClose}>My Account</MenuItem>
							<MenuItem onClick={this.handleClose}>Logout</MenuItem>
						</Menu> */}
					</nav>
					<h1>World's Best URL Shortner</h1>
					<Button
						variant="contained"
						color="primary"
						onClick={() => (window.location.href = "/home")}
					>
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
								<li>Can generate 5 links.</li>
								<li>Links valid for only 1 hour.</li>
								<li></li>
								<li></li>
							</ul>
							<Button variant="outlined" color="primary">
								Select
							</Button>
						</section>
						<section className="card">
							<span className="title">$1</span>
							<ul className="detail">
								<li>Can generate 100 links.</li>
								<li>Link will not expire.</li>
								<li></li>
								<li></li>
							</ul>
							<Button variant="outlined" color="primary">
								Select
							</Button>
						</section>
						<section className="card">
							<span className="title">$8</span>
							<ul className="detail">
								<li>Can generate 1000 links.</li>
								<li>Link will not expire.</li>
								<li></li>
								<li></li>
							</ul>
							<Button variant="outlined" color="primary">
								Select
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

export default App;
