import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.css'
import React from 'react';
import Header from './Components/Header';
import Main from './Components/Main';
import EngagementPhotos from './Components/EngagementPhotos';
//import WeddingPhotos from './Components/WeddingPhotos';
import { BrowserRouter as Routes, Route, Switch } from "react-router-dom";
function App(){
  return (
    <Routes>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route path="/Home">
          <Main/>
        </Route>
        <Route path="/WeddingPhotos">
          <EngagementPhotos/>
        </Route>
      </Switch>
      </Routes>
  );
}

export default App;

