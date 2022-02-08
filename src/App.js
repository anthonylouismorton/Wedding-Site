import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.css'
import Header from './Components/Header';
import Main from './Components/Main';
import EngagementPhotos from './Components/EngagementPhotos';
import Dashboard from './Components/Dashboard';
import WeddingPhotos from './Components/WeddingPhotos';
import RSVP from './Components/RSVP'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";


function App(){
  return (

    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route path="/Home">
          <Main/>
        </Route>
        <Route path="/EngagementPhotos">
          <EngagementPhotos/>
        </Route>
        <Route path="/WeddingPhotos">
          <WeddingPhotos/>
        </Route>
        <Route path="/Dashboard">
          <Dashboard/>
        </Route>
        <Route path="/RSVP">
          <RSVP/>
        </Route>
      </Switch>
      </Router>
  );
}

export default App;

