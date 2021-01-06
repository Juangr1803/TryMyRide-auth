// React
import React from 'react';
import ReactDOM from 'react-dom';
// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// Thunk
import thunk from 'redux-thunk';
// Reducer
import appReducer from './reducers';
// Routes
import App from './routes/App.js';
// Styles
import './assets/styles/index.css';

//--------------------------------------------//
//--------------------------------------------//

const middleware = [thunk];

const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

// React Dom
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
