import React, { useState } from 'react'
import './LoginForm.css'
import Button from './atoms/Button';
import InputGroup from './atoms/InputGroup';

const LoginForm = ({ handleLogin }) => {
	const [usernameValue, setUsernameValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		handleLogin(usernameValue, passwordValue);
		setUsernameValue('');
		setPasswordValue('');
	}

	return (
		<div className="wrapper">
			<div className="form-wrapper sign-up">
				<form onSubmit={handleSubmit} >
					<h2>Login</h2>
					<InputGroup
						label="Username"
						value={usernameValue}
						onChange={(event) => setUsernameValue(event.target.value)}
					/>
					<InputGroup
						label="Password"
						type="password"
						value={passwordValue}
						onChange={(event) => setPasswordValue(event.target.value)}
					/>
					<Button type={"submit"} msg={"login"} />
				</form>
			</div>
		</div>
	)
}

export default LoginForm