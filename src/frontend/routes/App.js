// React
import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
// Helpers
import { history } from '../helpers/history';
// Pages
import Home from '../pages/Home.js';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
// Components
import Layout from '../components/Layout';

//------------------------------------------//
//------------------------------------------//

const App = () => {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/edit" component={ProfileEdit} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
