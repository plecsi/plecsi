import axios from 'axios';

const SERVER_URL = "http://localhost:8888/react";

const login = async (data) => {
    const LOGIN_ENDPOINT = `${SERVER_URL}/api/login.php`;

    try {
        let response = await axios({
			url:LOGIN_ENDPOINT, 
			method: 'post',
			responseType: 'json',
			headers: {
				  'Content-Type': 'application/x-www-form-urlencoded',
				  'Accept': 'text/json'
				},
			data:data
		});
		console.log(response);
        if(response.status === 200 && response.data.jwt){
            let jwt = response.data.jwt;
			
            localStorage.setItem("access_token", jwt);
            localStorage.setItem("user", response.data.user);
            sessionStorage.setItem("message", response.data.message);
			console.log('status: ok')
        }
		else {
			localStorage.clear();
		}
    } catch(e){
        console.log('fail:', e);
    }
}

const register = async (data) => {
    const SIGNUP_ENDPOINT = `${SERVER_URL}/api/register.php`;
    try {
        let response = await axios({
            method: 'post',
            responseType: 'json',
            url: SIGNUP_ENDPOINT,
            data: data
          });
    } catch(e){
        console.log(e);
    }
}

const logout = () => {
	console.log('logout')
    localStorage.removeItem("access_token");
    localStorage.removeItem("expire_at");
}

export  { login, register, logout } 