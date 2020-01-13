import React from 'react';

export default (props) => {
	
	const {cards: {id, image, title, content ,rating, rating_img, name, lists, price, currency} } = props;	
	const isCard = props.names;
	
	const renderPost = (isCard) => {
		if(isCard == "giftCards") {
			return (
				<div className="card-container">		 
					<div className="custom-card-body">
						<div className="images" dangerouslySetInnerHTML={{ __html: image}}/>
						<h3 className="custom-card-title">{title}</h3>
						<p className="custom-card-text">{content}</p>
					</div>
				</div>
			);
		}
		else if (isCard== "makeCards") {
			let i,
				number = rating;
			const ratings = []
			 for(i = 0; i < number; i++){
				 ratings.push(<i key={i} className={rating_img}/>)
			 }
			
			return (
				<div className="card-container">		 
					<div className="custom-card-body">
						<img src={ image.src } srcSet={ image.srcset } alt="ize" className="images"/>
						<p className="custom-card-text">{content}</p>
						<div className="row justify-content-between">
							<div className="col-auto">
							{ratings}
							</div>
							<div className="col-auto name">{ name }</div>
						</div>
					</div>
				</div>
			);
		}
		else if (isCard== "customCards") {
			return (
				<div className="card-container">		 
					<div className="custom-card-body">
						<img src={ image.src } srcSet={ image.srcset } alt="ize" className="images"/>
						<h3 className="custom-card-title">{title}</h3>
						<p className="custom-card-text">{content}</p>
					</div>
				</div>
			);
		}
		else return false 
	}
	return renderPost(isCard);
}
	