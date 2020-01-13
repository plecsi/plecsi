import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory }from 'react-router-dom';
const Edit = ({match}) =>{
	const [edit, setEdit] = useState({});
 	let history = useHistory();

	useEffect(()=>{
		editItem();
	},[]);

	const editItem = async () => {
		try {
	      const header = {
	       "Authorization": `Token 58484fe3bfd7ed5efe2c36bf1ad2ed4ef88f4256`
	      }
	      const response = await axios({
	              url: `https://api.github.com/gists/${match.params.id}`, 
	              method: 'get',
	              headers: header
	            });
	      setEdit(response.data);

	      } catch (e) {
	      console.log('Failure!', e);
	      }

	}

	const editSubmit = async () =>{
		const datas  = {
		  description: edit.description,
		  files: {
		    [edit.files] : {
		      content: edit.content
		    }
		  }
		}

    try {
	      const header = {
	       'Authorization': `Token 58484fe3bfd7ed5efe2c36bf1ad2ed4ef88f4256`
	      }
	     const res = await axios({
	              url: `https://api.github.com/gists/${match.params.id}`, 
	              method: 'patch',
                headers: header,
                data: datas
	            });
	     history.push("/");
	      

	      } catch (e) {
	      console.log('Failure!', e);
	      }
	}

const handleChange = (event) => {
    event.persist(); 
    setEdit({ ...edit, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
     console.log('submit')
     editSubmit();
  };

const files = [];
	for(var f in edit.files){
	return (
		<div className="file-edit">
			 <form onSubmit={handleSubmit}>
			      <div className="file-edit">
			      	<input type="hidden" name="description" value={edit.description}/>
			        <h2 className="file-edit__name">
			        	<input type="text" name="files" onChange={handleChange} value={edit.files[f].filename} placeholder="filename.ext"/>
			    	</h2>
			        <textarea name="content" onChange={handleChange} value={edit.files[f].content}></textarea>
			        <div className="file-edit__buttons">
			          <button className="btn btn--positive">Save</button>
			        </div>
			      </div>
			    
			</form>
	  </div>
	)
}
return files;
}

export default Edit;