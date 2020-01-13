import React, {Component} from 'react';
import Header from './Component/Header.jsx';
import FstContent from './Component/FirstContent.jsx';
import Json from './Component/Json.jsx';
import Dates from "./Component/date";
import VideoContent from "./Component/video";


class App extends Component{
	render() {
		return (
			<>
				<Header/>
				<FstContent/>
				<div className="container-fluid content-container">
					<Json names="giftCards"/>
				</div>
				<div className="container-fluid content-container">
					<Json names="makeCards"/>
					<div className="row py-3 my-3 justify-content-center">
						<div className="col-12 col-lg-7">
							<Dates minYear={2010} maxYear={2030} ids="date_1"/>
						</div>
					</div>
					<Json names="customCards"/>
					<div className="row py-3 my-3 justify-content-center">
						<div className="col-12 col-lg-7">
							<Dates minYear={2005} maxYear={2010} ids="date_2"/>
						</div>
					</div>
				</div>
				<div className="container-fluid content-container" id="video_content">
						<VideoContent/>
				</div>
			</>
		);
  }
}

export default App;