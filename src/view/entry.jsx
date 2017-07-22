import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import CreateBrowserHistory from 'history/createBrowserHistory';
import App from './components/App';

const history = CreateBrowserHistory();

ReactDOM.render(
  <Router basename="/" history={history}>
    <App />
  </Router>
  , document.getElementById('root'),
);
