import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.css'
import Header from './Components/Header';
import Main from './Components/Main';
import EngagementPhotos from './Components/EngagementPhotos';
import Dashboard from './Components/Dashboard';
import WeddingPhotos from './Components/WeddingPhotos';
import RSVP from './Components/RSVP'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import {useState} from 'react'
import rsvpBackGroundImage from './images/rsvpBackground.png'
import mainBackGroundImage from './images/mainBackgroundImage.png'

function App(){
  const [background, setBackground] = useState(mainBackGroundImage)
  
  const handleBackground = (image, currentPage) => {
    setBackground(image)
  }
  console.log(background)
  return (
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
      maxHeight: '100vh'
    }}>
    <Router>
    <Header handleBackground={handleBackground}/>
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
        {/* <Link to="/RSVP"
          onClick={() => handleBackground(rsvpBackGroundImage)}
          >
        </Link> */}
        <Route 
          path="/RSVP"
          onClick={() => handleBackground(rsvpBackGroundImage)}
        >
          <RSVP handleBackground={handleBackground}/>
        </Route>
      </Switch>
    </Router>
  </div>
  );
}

export default App;

