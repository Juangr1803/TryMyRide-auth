// React
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import Home from '../pages/home';
import Profile from '../pages/Profile';

//---------------------------------------------//
//---------------------------------------------//

// App
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/profile" component={Profile} />
  </Switch>
);

export default App;
