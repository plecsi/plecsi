import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Link } from 'react-router-dom';


const List = () => {
	const [list, setList] = useState([{
		files: []
	}]);
	const [loading, setLoading] = useState(true);

	useEffect(()=>{
		getItems();
	},[]);

	const getItems = async () => {
		try {
	      const header = {
	       "Authorization": `Token 58484fe3bfd7ed5efe2c36bf1ad2ed4ef88f4256`
	      }
	      const response = await axios({
	              url: 'https://api.github.com/users/plecsi/gists', 
	              method: 'get',
	              headers: header
	            });
	      setList(response.data);
	      setLoading(false);

	      } catch (e) {
	      console.log('Failure!', e);
	      }
	}



const files = (items, id) => {
	var files = [];
	var filenames = [];
	for(files in items){
		filenames.push(<Link to={`/files/${id}`} className="item-link">{files}</Link>)
	}
	return filenames	
}
	
return( 
	<>
		
		{loading ? <div>loading...</div> : 
			<>
				{list.map((item)=> (
					<li key={item.id}>{files(item.files, item.id)}</li>
				))}
			</>
		}
			
		
	</>	
);
}

export default List;