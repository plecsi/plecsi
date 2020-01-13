import React from 'react';

export default (props) => {
	
	const {titles: {id, title, content} } = props;	
	const isTitle = props.titleName;
	
	const render = (isTitle) => {
		if(isTitle == "giftCards") {
			return (
				<h2>{title}</h2>
			);
		}
		else if (isTitle == "makeCards") {
			return (
				<>
				<div className="container">
					<h2>{title}</h2>
					<div className="row justify-content-center">
						<div class="col-md-5">
							<p dangerouslySetInnerHTML={{ __html: content}}/>
						</div>
					</div>
					
				</div>
					<div className="row justify-content-end arrow-buttons">
					<a href="#" className="btn btn-primary"><i className="fa-chevron-left"></i></a>
					<a href="#" className="btn btn-primary"><i className="fa-chevron-right"></i></a>
				</div>
				</>
			);
		}
		else if(isTitle == "customCards") {
			return (
				<h2>{title}</h2>
			);
		}
		else return false
	}
	return render(isTitle);

}
	