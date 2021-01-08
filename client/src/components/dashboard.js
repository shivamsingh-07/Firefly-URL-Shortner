import React, { Component } from "react";
import {
	Container,
	Button,
	Menu,
	MenuItem,
	TableContainer,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Fab,
	Chip,
	TextField,
} from "@material-ui/core";
import { AccountCircle, Add, CheckCircleOutlineOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import ClipboardJS from "clipboard";
import axios from "axios";

class dashboard extends Component {
	state = {
		anchorEl: null,
		popEl: null,
		show: false,
		username: "",
		email: "",
		verified: false,
		limit: 0,
		usedLimit: 0,
		type: 0,
	};

	handleClick = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	componentDidMount = () => {
		// User Data
		axios
			.post("https://firefly-api.glitch.me/auth/user", {
				auth: document.cookie.slice(11),
			})
			.then((res) => {
				this.setState({
					...this.state,
					username: res.data.name,
					email: res.data.email,
					verified: res.data.is_verified,
					limit: res.data.balance,
					type: res.data.account_type,
				});
			});

		// URL List
		var count = 0;
		axios
			.post("https://firefly-api.glitch.me/api/url/search", {
				auth: document.cookie.slice(11),
			})
			.then((res) => {
				res.data.forEach((element) => {
					var row = document.createElement("tr");
					row.classList.add("MuiTableRow-root");
					row.innerHTML = `<td class="MuiTableCell-root MuiTableCell-body">${++count}.</td>
								<td class="MuiTableCell-root MuiTableCell-body">${element.urlName}</td>
								<td class="MuiTableCell-root MuiTableCell-body">
									<button class="MuiButtonBase-root MuiIconButton-root btn" tabindex="0" type="button" data-clipboard-text=${
										element.shortUrl
									}><span class="MuiIconButton-label"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4H8c-1.1 0-1.99.9-1.99 2L6 21c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V11l-6-6zM8 21V7h6v5h5v9H8z"></path></svg></span><span class="MuiTouchRipple-root"></span></button>
								</td>
								<td class="MuiTableCell-root MuiTableCell-body">${element.date}</td>`;

					document.getElementById("linkData").appendChild(row);
				});
				this.setState({ usedLimit: count });
			});

		// Transaction List
		var txn = 1;
		axios
			.post("https://firefly-api.glitch.me/api/transaction/fetch", {
				auth: document.cookie.slice(11),
			})
			.then((res) => {
				res.data.forEach((element) => {
					var row = document.createElement("tr");
					row.classList.add("MuiTableRow-root");
					row.innerHTML = `<td class="MuiTableCell-root MuiTableCell-body">${txn++}.</td>
								<td class="MuiTableCell-root MuiTableCell-body">${element.txnID}</td>
								<td class="MuiTableCell-root MuiTableCell-body">${element.date}</td>
								<td class="MuiTableCell-root MuiTableCell-body">${element.paymentMode}</td>
								<td class="MuiTableCell-root MuiTableCell-body">${element.txnAmt + " " + element.currency}</td>`;

					document.getElementById("txnData").appendChild(row);
				});
			});
	};

	render() {
		new ClipboardJS(".btn");
		return (
			<div>
				<Container className="content">
					<nav>
						<span className="logo">FIREFLY</span>
						<AccountCircle
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
							onClose={() => {
								this.setState({ anchorEl: null });
							}}
						>
							<MenuItem
								onClick={() => {
									this.setState({ anchorEl: null, show: false });
								}}
							>
								Home
							</MenuItem>
							<MenuItem
								onClick={() => {
									this.setState({ anchorEl: null, show: true });
								}}
							>
								My Account
							</MenuItem>
							<MenuItem
								onClick={() => {
									document.cookie =
										"auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
									window.location.href = "/";
								}}
							>
								Logout
							</MenuItem>
						</Menu>
					</nav>
				</Container>

				<Container className="display" style={{ display: this.state.show ? "none" : "" }}>
					<section className="top">
						<span style={{ fontSize: "20px" }}>
							URL Limit:{" "}
							<code>
								{this.state.limit - this.state.usedLimit}/{this.state.limit}
							</code>
						</span>
						&nbsp;&nbsp;
						<Button
							variant="contained"
							color="primary"
							href="/payment"
							onClick={(e) => console.log(e)}
						>
							Increase Limit
						</Button>
					</section>

					<section>
						<Typography variant="h4">Active Short URL's</Typography>
						<br />
						<TableContainer component={Paper}>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell component="th">S.No.</TableCell>
										<TableCell>Name</TableCell>
										<TableCell>Short URL</TableCell>
										<TableCell>Date Created</TableCell>
										{/* <TableCell></TableCell> */}
									</TableRow>
								</TableHead>
								<TableBody id="linkData"></TableBody>
							</Table>
						</TableContainer>
						<br />
						<br />
						<br />
						<Fab
							variant="extended"
							href="/createlink"
							disabled={this.state.limit <= this.state.usedLimit}
						>
							<Add />
							&nbsp;Create Link
						</Fab>
					</section>

					{/* Copy Popover
					<Popover
						id={this.state.popEl ? "simple-popover" : undefined}
						open={this.state.popEl}
						anchorEl={this.state.popEl}
						onClose={() => {
							this.setState({ popEl: null });
						}}
						anchorOrigin={{
							vertical: "top",
							horizontal: "center",
						}}
						transformOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
					>
						<Typography style={{ padding: "5px 10px" }}>Link Copied</Typography>
					</Popover> */}
				</Container>

				{/* My Account Container */}
				<Container className="display" style={{ display: this.state.show ? "" : "none" }}>
					{!this.state.verified && (
						<Alert severity="warning" style={{ marginBottom: "20px" }}>
							Your account is not verified.
						</Alert>
					)}

					<Typography variant="h3">Account Details</Typography>
					<br />

					{this.state.verified && (
						<Chip
							variant="outlined"
							size="medium"
							label="Verified"
							icon={<CheckCircleOutlineOutlined style={{ color: "green" }} />}
							style={{ color: "green", borderColor: "green", fontSize: "14px" }}
						/>
					)}

					{/* Details */}
					<section className="user">
						<br />
						<TextField
							type="text"
							label="Full Name"
							variant="filled"
							className="input"
							disabled
							value={this.state.username}
						/>

						<br />
						<br />
						<TextField
							type="email"
							label="Email"
							variant="filled"
							className="input"
							disabled
							value={this.state.email}
						/>
						<br />
						<br />
						<br />
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								var newPass = prompt("Please enter new password:", "");
								if (newPass !== null && newPass !== "") {
									axios
										.post("https://firefly-api.glitch.me/auth/resetpassword", {
											newPass,
											auth: document.cookie.slice(11),
										})
										.then(() => alert("Your password is changed."));
								}
							}}
						>
							Change Password
						</Button>
					</section>

					{/* Payment Details */}
					<section className="payment">
						<Typography variant="h4">Transaction History</Typography>
						<br />
						<TableContainer component={Paper}>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell component="th">S.No.</TableCell>
										<TableCell>Transaction ID</TableCell>
										<TableCell>Date</TableCell>
										<TableCell>Mode of Payment</TableCell>
										<TableCell>Amount</TableCell>
									</TableRow>
								</TableHead>
								<TableBody id="txnData"></TableBody>
							</Table>
						</TableContainer>
					</section>
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

export default dashboard;
