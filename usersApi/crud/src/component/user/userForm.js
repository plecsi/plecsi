
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import FormPanel from '../validation/components/FormPanel';
import userModel from './userModel';
// import submit from '../validation/callback';
// import M from 'materialize-css/';

const EditUserForm = props => {

    console.log('editform', props)
    const [user, setUser] = useState(props.currentUser)
  
    const handleInputChange = event => {
      const { name, value } = event.target
  
      setUser({ ...user, [name]: value })
    }
  
    return (
      <form
        onSubmit={event => {
          event.preventDefault()
  
          props.updateUser(user.id, user)
        }}
      >
        <label>Name</label>
        <input type="text" name="name" onChange={handleInputChange} />
        <label>Username</label>
        <input type="text" name="username" onChange={handleInputChange} />
        <button>Update user</button>
        <button onClick={() => props.setEditing(false)} className="button muted-button">
          Cancel
        </button>
      </form>
    )
  }

  
 
const User = props =>{
    const [ users, setUsers ] = useState([])
	const [ currentUser, setCurrentUser ] = useState()
	const [ editing, setEditing ] = useState(false)
    const LOGIN_ENDPOINT = "http://localhost:8888/react/api/user/get_user.php";
    const userToken = JSON.parse(sessionStorage.getItem("@SecretToken"));
   
    const selectUser = async (e) =>{
        const data ={
            user_id: e.user_id,
            token: e.token
        }
        try {
			let response = await axios({
				url: LOGIN_ENDPOINT, 
				method: 'post',
				responseType: 'json',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'text/json'
				},
				data: data
			});

			//setIsLoading(true)

			if(response.status === 200 && response.data.token){
                console.log('res', response)
                //userModel(response.data)
                setUsers(response.data)
                
               // userModel(response.data)
				//login(response.data)
				//setIsLoading(false)
			} else {
				//setIsError({message: response.data.message,error: true});
			}
		} catch(e) {
			console.log('fail:', e);
			//setIsError({message: e,error: true});
		}

    }

    const submitCallback = e => {
       // const result =  submit(userModel)
       // postLogin(result);
       
    }

    useEffect(()=>{
        selectUser(userToken)
        return () =>{
            console.log('vége')
        }
    }, []);



  return (
     <div>
         {users.user}
    
     </div> 
  ) 
//return  (<FormPanel model={result}/>)

}


export default User;