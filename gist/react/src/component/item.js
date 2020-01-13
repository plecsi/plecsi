import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useHistory }from 'react-router-dom';

const Item = ({match}) => {
	const [item, setItem] = useState({});
	let history = useHistory();

	useEffect(()=>{
		getSingleItem();
	},[]);

	const getSingleItem = async () => {
		try {
	      const header = {
	       "Authorization": `Token 58484fe3bfd7ed5efe2c36bf1ad2ed4ef88f4256`
	      }
	      const response = await axios({
	              url: `https://api.github.com/gists/${match.params.id}`, 
	              method: 'get',
	              headers: header
	            });

	      setItem(response.data);

	      } catch (e) {
	      console.log('Failure!', e);
	      }
}
const deleteFile = async () =>{
	console.log('delete', item.id)

	try {
	      const header = {
	       "Authorization": `Token 58484fe3bfd7ed5efe2c36bf1ad2ed4ef88f4256`
	      }
	      const response = await axios({
	              url: `https://api.github.com/gists/${item.id}`, 
	              method: 'delete',
	              headers: header
	            });

	      setItem(response.data); 
	      history.push("/");

	      } catch (e) {
	      console.log('Failure!', e);
	      }
}

const file = () =>{
	const files = [];
	for(var f in item.files){

		files.push(
			<div className="file-item__header">
              <h2 className="file-item__name">{item.files[f].filename}</h2>
             
            </div>,
			<div className="file-item__content">
              <pre>
              {item.files[f].content}
              </pre>
            </div>
            )
	}
	return files
}

	return( 
		<div className="file-item">
			<div className="file-item__body">{file()}</div>

			 <div className="file-item__buttons">
                <button className="btn btn--negative" onClick={deleteFile}>Delete</button>
                <Link to={`/files/${item.id}/edit`} className="btn btn--positive">Edit</Link>
              </div>
		</div>
	);
}

export default Item;