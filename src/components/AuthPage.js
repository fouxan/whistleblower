import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Import the CSS file

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
		<div className="auth-container">
			<div className="auth-header">
				<h1>Welcome to Whistleblower Prototype</h1>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="auth-form">
				<h2>Login</h2>
				{error && <p className="error-message">{error}</p>}

				<div>
					<input
						type="text"
						placeholder="Username"
						{...register("username", { required: "Username is required" })}
						className="custom-input"
					/>
					{errors.username && (
						<p className="error-message">{errors.username.message}</p>
					)}
				</div>

				<div>
					<input
						type="password"
						placeholder="Password"
						{...register("password", { required: "Password is required" })}
						className="custom-input"
					/>
					{errors.password && (
						<p className="error-message">{errors.password.message}</p>
					)}
				</div>

				<button type="submit" className="submit-button">
					Login
				</button>
			</form>
		</div>
	);
};

export default AuthPage;
