import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { isAuthenticated, login } from "../auth"
import M from 'materialize-css/';
import LoginForm from './loginForm';



function Login(props){
    const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState({
		error: false,
		message: ''
	});
	const [loginData, setLoginData] = useState();

	
	
	// const handleSubmit = e => {
	// 	e.preventDefault();
	// 	postLogin(e)
    // }

    if (isAuthenticated()) {
		props.history.push("/dashboard")
	} 
	
	
	const errorToast = () => {
		M.toast({html: isError.message})
		setIsError(false)
	}	
return(
    <div>
         <LoginForm/>
    </div>
   
)
}

export default Login;