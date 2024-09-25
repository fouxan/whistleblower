import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const onSubmit = (data) => {
		const { username, password } = data;
		if (
			username === process.env.REACT_APP_USERNAME &&
			password === process.env.REACT_APP_PASSWORD
		) {
			navigate("/select");
		} else {
			setError("Invalid credentials");
		}
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "center" }}>
				<h2>Login</h2>
				{error && <p style={{ color: "red" }}>{error}</p>}

				<div>
					<input
						type="text"
						placeholder="Username"
						{...register("username", { required: "Username is required" })}
						style={{ padding: "8px", marginBottom: "10px", width: "200px" }}
					/>
					{errors.username && (
						<p style={{ color: "red" }}>{errors.username.message}</p>
					)}
				</div>

				<div>
					<input
						type="password"
						placeholder="Password"
						{...register("password", { required: "Password is required" })}
						style={{ padding: "8px", marginBottom: "10px", width: "200px" }}
					/>
					{errors.password && (
						<p style={{ color: "red" }}>{errors.password.message}</p>
					)}
				</div>

				<button type="submit" style={{ padding: "8px 20px" }}>
					Login
				</button>
			</form>
		</div>
	);
};

export default AuthPage;
