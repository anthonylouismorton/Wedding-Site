import React from 'react';
import ReactDOM from 'react-dom';
import './styling/index.css';
import App from './App';
import SiteProvider from './context/siteContext'

ReactDOM.render(
  <React.StrictMode>
    <SiteProvider>
     <App />
    </SiteProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
