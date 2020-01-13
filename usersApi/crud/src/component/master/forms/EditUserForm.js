import React, { useState, useEffect } from 'react'
import FormPanel from '../../validation/components/FormPanel'
import axios from 'axios'; 
import submit from '../../validation/callback';

const EditUserForm = props => {
  const [ user, setUser ] = useState(props.currentUser)
  const url = 'http://localhost:8888/react/api/user/update_user_data.php'

  useEffect(
    () => {
      setUser(props.currentUser)
    },
    [ props ]
  )

  const updateUser = async(e) =>{
    console.log('axios', e)
    try {
			let response = await axios({
				url: url, 
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
			  
			} else {
			//	setIsError({message: response.data.message,error: true});
			}
		} catch(e) {
			console.log('fail:', e);
		//	setIsError({message: e,error: true});
		}
  }
  
  const model = [
    {
      name: 'user_id',
      label: 'userid',
      type: 'hidden',
      value: user ? user.user_id : '',
    },
    {
      name: 'firstname',
      label: 'firstname',
      type: 'text',
      value: user ? user.firstname : '',
    }, 
    {
      name: 'nickname',
      label: 'nickname',
      type: 'text',
      value: user ? user.nickname : '',
    },
    {
      name: 'token',
      label: 'token',
      type: 'hidden',
      value: user ? user.token : '',
    }
  ]

  const submitCallback = e => {
    console.log('submit')
		const result =  submit(model)
    updateUser(result);
	  }

  return <FormPanel submitCallback={submitCallback} btnName='Update' model={model}/>
}

export default EditUserForm
