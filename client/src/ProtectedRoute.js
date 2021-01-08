import { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ component: Component, ...rest }) {
	const [auth, setAuth] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetch = async () => {
			try {
				if (document.cookie) {
					var res = await axios.post("https://firefly-api.glitch.me/auth/verify-token", {
						auth_token: document.cookie.slice(11),
					});
					if (res.status === 200) setAuth(true);
				}
			} catch (error) {
				console.log(error);
			}
			setLoading(true);
		};
		fetch();
	}, []);

	if (loading)
		return (
			<Route
				{...rest}
				render={(props) => {
					if (auth) return <Component />;
					else return <Redirect to={{ pathname: "/auth", state: { from: props.location } }} />;
				}}
			/>
		);
	return <></>;
}

export default ProtectedRoute;
