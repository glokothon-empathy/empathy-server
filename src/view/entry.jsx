import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import CreateBrowserHistory from 'history/createBrowserHistory';
import IdeaList from './components/IdeaList';

const history = CreateBrowserHistory();

ReactDOM.render(
  <Router basename="/" history={history}>
    <IdeaList />
  </Router>
  , document.getElementById('root'),
);
