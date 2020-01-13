import {React, useState} from "react";
import axios from 'axios';
import { isAuthenticated, login } from "../auth"


const postLoginData = (data) =>{
	
	// const [isLoading, setIsLoading] = useState(false);
	// const [isError, setIsError] = useState({
	// 	error: false,
	// 	message: ''
	// });
	const LOGIN_ENDPOINT = "http://localhost:8888/react/api/user/login.php";

	const postLogin = async (e) => {
	
		console.log('asdlaksdasld', e)
		
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

			//setIsLoading(true)

			if(response.status === 200 && response.data.token){
				let token = response.data.token;
				let user = response.data.user;
				console.log('res', response)
				login({token, user})
				//setIsLoading(false)
			} else {
				//setIsError({message: response.data.message,error: true});
			}
		} catch(e) {
			console.log('fail:', e);
			//setIsError({message: e,error: true});
		}
	}
	return postLogin(data);
}

export default postLoginData;