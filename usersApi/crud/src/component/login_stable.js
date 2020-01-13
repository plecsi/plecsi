import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { isAuthenticated, login } from "./auth"
import M from 'materialize-css/';

function Login(props) {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState({
		error: false,
		message: ''
	});
	const [loginData, setLoginData] = useState();

	
	const LOGIN_ENDPOINT = "http://localhost:8888/react/api/user/login.php";

	const postLogin = async (e) => {
		console.log('e', loginData)
		e.preventDefault();  
		try {
			let response = await axios({
				url: LOGIN_ENDPOINT, 
				method: 'post',
				responseType: 'json',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'text/json'
				},
				data: loginData
			});

			setIsLoading(true)

			if(response.status === 200 && response.data.token){
				let token = response.data.token;
				let user = response.data.user;

				login({token, user})
				setIsLoading(false)
			} else {
				setIsError({message: response.data.message,error: true});
			}
		} catch(e) {
			console.log('fail:', e);
			setIsError({message: e,error: true});
		}
	}
	const handleSubmit = e => {
		e.preventDefault();
		postLogin(e)
	}
 
const handleChange = key => event => {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setLoginData({ ...loginData, [name]: value } )
	setIsLoading(false)
	setIsError(false)
}

	if (isAuthenticated()) {
		props.history.push("/dashboard")
	} 
	
	
	const errorToast = () => {
		M.toast({html: isError.message})
		setIsError(false)
	}	
			 
	
  return (
	<div className="row">
		<form className="col m12" onSubmit={handleSubmit}>
			<div className="row">
				<div className="input-field col m6">
	   				<input id="mail" type="email" name="email" onChange={handleChange()} className="validate"/>
					<label htmlFor="mail">E-mail</label>
				</div>
				<div className="input-field col m6">
					<input id="psw" type="password" name="password" onChange={handleChange()} className="validate"/>
					<label htmlFor="psw">Password</label>
				</div>
			   <button className="btn waves-effect waves-light">Sign In</button>
			</div>
		</form>
	  <Link to="/signup">Don't have an account?</Link>
       {isError.message && errorToast() }
		{isLoading && <p>loading</p>}
	</div>
  );
}

export default Login;