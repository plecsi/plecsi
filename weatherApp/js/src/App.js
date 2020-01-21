import React from "react";
import { Router, Route, Switch } from "react-router-dom"
import { createBrowserHistory } from "history"
import Home from './component/Home/Home';
import {CssBaseline} from '@material-ui/core';
import "./style/main.scss";

const  App = ()=> {
	const hist = createBrowserHistory()
	return (
	<>
		<CssBaseline />
		<Router history={hist}>
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		</Router>
	</>
	)
}
export default App;