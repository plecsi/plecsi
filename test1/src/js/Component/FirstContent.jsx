import React, {Component} from 'react';

class FstContent extends Component{
	render() {
    return (
		<div className="container-fluid" id="first_content">
			<div className="container content">
				<div className="row justify-content-center">
				<div className="col-md-9">
					<h2>The best birthday gift</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan congue fermentum. Praesent lobortis massa turpis, sit amet placerat metus sollicitudin eget. </p>
					<img src="./assets/images/newspaper-mockup-5.png"
     srcSet="./assets/images/newspaper-mockup-5@2x.png 2x,
             ./assets/images/newspaper-mockup-5@3x.png 3x"
     className="img-fluid newspaper"/>
				</div>
			</div>
			</div>
		</div>
		
    );
  }
}

export default FstContent;