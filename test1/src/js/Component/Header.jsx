import React, {Component} from 'react';

class Header extends Component{
	render() {
    return (
		<header className="container">
			<nav className="nav navbar">
				<div className="birthday">Birthday 
					<span className="orange">-</span> 
					<span className="gray">Newspapper
						<span className="orange">s</span>
					</span>
					<span className="rectangle"></span>
				</div>
				<ul className="nav navbar d-none d-md-flex px-sm-0">
					<li className="nav-item">
						<a className="nav-link btn btn-link active" href="#">Home</a>
					</li>
					<li className="nav-item">
						<a className="nav-link btn btn-link" href="#">Order</a>
					</li>
					<li className="nav-item">
						<a className="nav-link btn btn-link" href="#" aria-disabled="true">Faq</a>
					</li> 
					<li className="nav-item">
						<a className="nav-link btn btn-link" href="#" aria-disabled="true">Contact</a>
					</li>
				</ul>
				<div className="dropdown d-md-none">
					<a className="custom-dropdown" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
						<span className="line"></span>
						<span className="line"></span>
						<span className="line"></span>
					</a>
					<div className="dropdown-menu dropdown-menu-right">
						<a className="dropdown-item" href="#">Home</a>
						<a className="dropdown-item" href="#">Order</a>
						<a className="dropdown-item" href="#">Faq</a>
						<a className="dropdown-item" href="#">Contact</a>
					</div>

				</div>
				<a href="#" className="btn btn-primary d-none d-md-block" id="start_btn">Start here</a>
			</nav>
		</header>
    );
  }
}

export default Header;