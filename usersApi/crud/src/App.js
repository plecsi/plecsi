import React from "react";
import { Router, Route, Switch } from "react-router-dom"
import { createBrowserHistory } from "history"
import PrivateRoute from './PrivateRoute';
import Nav from './component/nav';
import Home from './component/Home/Home';
import User from './component/master/App'
import Login from './component/login/loginForm';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import "./style/main.scss";

const Dashboard = (props) =>{
	return <div>Dashboard</div>
}

const  App = ()=> {
	const hist = createBrowserHistory()
	return (
	<>
	<CssBaseline />
		<Router history={hist}>
			<Nav/>
			<Container maxWidth="lg" component="main">
			<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<PrivateRoute path="/dashboard" component={Dashboard} />
			<Route path="/user" component={User} />
			</Switch>
			</Container>
	  	</Router>
	  </>
	)
}

export default App;