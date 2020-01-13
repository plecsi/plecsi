import React, { useState } from "react";
import axios from 'axios';
import FormPanel from '../validation/components/FormPanel';
import loginModel from './loginModel';
import { isAuthenticated,login } from "../auth";
import submit from '../validation/callback';

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState({
		error: false,
		message: ''
	});
	const LOGIN_ENDPOINT = "http://localhost:8888/react/api/user/login.php";


  const submitCallback = e => {
    const result =  submit(loginModel)
    postLogin(result);
  }

	const postLogin = async (e) => {		
		//e.preventDefault();  
		try {
			let response = await axios({
				url: LOGIN_ENDPOINT, 
				method: 'post',
				responseType: 'json',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'text/json'
				},
				data: e
			});

			setIsLoading(true)

			if(response.status === 200 && response.data.token){
				// let token = response.data.token;
				// let user = response.data.user;
				console.log('res', response)
				login(response.data)
				setIsLoading(false)
			} else {
				setIsError({message: response.data.message,error: true});
			}
		} catch(e) {
			console.log('fail:', e);
			setIsError({message: e,error: true});
		}
	}
  
  if (isAuthenticated()) {
    props.history.push("/dashboard")
  } 
  const errorToast = () => {
		//M.toast({html: isError.message})
		setIsError(false)
	}	
  
  return (
    <div>
		
     <FormPanel title="login" btnName="login" submitCallback={submitCallback} model={loginModel} />
     {isError.message && errorToast() }
		{isLoading && <p>loading</p>}
    </div>
  );
};

export default Login;