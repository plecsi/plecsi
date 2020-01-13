import React, {Component} from 'react';

class VideoContent extends Component{
	render() {
    return (
		<div className="row video-content-inner">
			<div className="col-lg-10 col-xl-8">
				<div className="row justify-content-center align-items-center">
					<div className="col-lg-4 position-relative">
						<p>Nézd meg a videón, hogy hogyan néz ki egy elkészült replica</p>
						<i className="fa-reply fa-4x reply d-none d-lg-block"></i>
					</div>
					<div className="col-md-8 col-lg-6">
						<img src="./assets/images/bitmap.png"
					 srcSet="./assets/images/bitmap@2x.png 2x,
							 ./assets/images/bitmap@3x.png 3x"
							className="img-fluid videos"/>
					</div>
				</div>
			</div>
		</div>	
    );
  }
}

export default VideoContent;