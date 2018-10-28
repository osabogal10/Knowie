
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// containers
import App from './ui/App.js';


import NewActivity from './ui/NewActivity.js';


export const AppRoutes = () => (
  <Router>
    <div>
      <Route exact path='/' component={App}/>
      <Route exact path='/new' component={NewActivity}/>
    </div>
  </Router>
);