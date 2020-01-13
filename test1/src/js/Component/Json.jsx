import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './Cards.jsx';
import Title from './Title.jsx';
import API from './api';

 const Json = (props) => {
	const {names} = props;
	const [isLoaded, setLoad] = useState([false]);
	const [list, setList] = useState([]);
	const [title, setTitle] = useState([]);
	 const isCancelled = React.useRef(false);
	
	const getList = async(names) => {
		try {
			const res = await API.get('cards?id='+names.names);
			if (!isCancelled.current) {
				setLoad(true);
				setList(res.data);
			}
		  } catch (e) {
			console.error('Failure!');
			console.error(e.response.status);
		  }
	}
	const getTitle = async(names) => {
		try {
			const response = await API.get('container?id='+names.names);
			if (!isCancelled.current) {
				setLoad(true);
				setTitle(response.data);
			}
		  } catch (e) {
			console.error('Failure!');
			console.error(e.response.status);
		  }
	}
	
	useEffect( () => {
			  
		setLoad(true);
		getList({names});
		getTitle({names});
	 return () => {
      isCancelled.current = true;
    };
	}, []);
	
	const renderTitle = (title, index) => {
		return <Title key={index} titles={title} titleName={props.names}/>	
	}
	const renderPost = (cards, index) => {
		return <Cards key={index} cards={cards} names={props.names}/>
	}
	const ids = `card_${props.names}`
	if (!{isLoaded}) {
		return <div className="loader">Loading ...</div>
	}else{
		return(
			<div className="cards-container-inner" id={ids}>
				{title.length > 0 &&  title.map(renderTitle)}
				<div className="card-container-inner">
					<div className="card-main-container">
						{list.length > 0 &&  list.map(renderPost)}
					</div>
				</div>
			</div>
		);
		}
}

export default Json;