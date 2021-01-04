// React
import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
// Helpers
import { history } from '../helpers/history';
// Pages
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';
// Components
import Layout from '../components/Layout';

//------------------------------------------//
//------------------------------------------//

const App = () => {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
