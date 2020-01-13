import React, { useState, useEffect, Fragment } from 'react'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import UserTable from './tables/UserTable'
import axios from 'axios'

const App = () => {
	const initialFormState = {}

	// Setting state
	const [ users, setUsers ] = useState([])
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	const LOGIN_ENDPOINT = "http://localhost:8888/react/api/user/get_user.php";
    //const userToken = JSON.parse(sessionStorage.getItem("@SecretToken"));
   
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
                setUsers(response.data)
				//setIsLoading(false)
			} else {
				//setIsError({message: response.data.message,error: true});
			}
		} catch(e) {
			console.log('fail:', e);
			//setIsError({message: e,error: true});
		}
    }
	//selectUser(userToken)
	useEffect(()=>{
		selectUser()
	}, [])

	// CRUD operations
	const addUser = user => {
		user.id = users.length + 1
		setUsers([ ...users, user ])
	}

	const deleteUser = id => {
		setEditing(false)

		setUsers(users.filter(user => user.user_id !== id))
	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)
		setUsers(updateUser.user_id === id ? updatedUser : updateUser)
	}

	const editRow = user => {
		setEditing(true)
		setCurrentUser(user)
	}

	return (
		<div className="container">
			<h1>CRUD App with Hooks</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add user</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View users</h2>
					{users !== '' ? <UserTable users={users} editRow={editRow} deleteUser={deleteUser} /> : 'nem'}
				</div>
			</div>
		</div>
	)
}

export default App
