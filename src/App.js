import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import Main from './Components/Main';
import Header from './Components/Header';
import EngagementPhotos from './Components/EngagementPhotos';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
export default class App extends React.Component{
  render(){
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route path="/Engagementphotos">
          <EngagementPhotos/>
        </Route>
      </Switch>
      </Router>
  );
}
}


