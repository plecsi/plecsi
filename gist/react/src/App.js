import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
//import axios from 'axios';
import Nav from './component/nav';
import List from './component/list';
import Item from './component/item';
import create from './component/create';
import Edit from './component/edit';

import './scss/main.scss';
const App = () =>{
  return(
    <Router>
      <div className="github-notes">
        <Nav/>
        <div className="main-body">
          <aside className="main-sidebar">
            <ul className="file-list">
            <List/>
            </ul>
            <Link to="/create" className="main-sidebar__add">Add new</Link>
            </aside>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/files/:id" exact component={Item}/>
             <Route path="/files/:id/edit" exact component={Edit}/>
            <Route path="/create" component={create}/>
          </Switch>
        </div>
      </div>
    </Router>
    );
}

const Home = () =>{
  return (
    <main className="main-content">
        <div className="main-content__empty">Nothing selected</div>
      </main>
    )
}

export default App;



/*<Switch>
            <Route path="/" exact component={List}/>
            <Route path="/edit/:id" exact  component={Edit}/>
            <Route path="/files/:id" exact  component={Item}/>
            <Route path="/create" exact component={create}/>
          </Switch>*/