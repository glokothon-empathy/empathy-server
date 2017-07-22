import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import CreateBrowserHistory from 'history/createBrowserHistory';
import IdeaList from './components/IdeaList';
import Navbar from './components/Navbar';
import Detail from './components/Detail';
import Profile from './components/Profile';

const history = CreateBrowserHistory();

ReactDOM.render(
  <Router basename="/" history={history}>
    <div>
      <Navbar />
      <Route exact path="/" component={IdeaList} />
      <Route exact path="/detail/:idea_id" component={Detail} />
      <Route exact path="/profile/:owner_id" component={Profile} />
    </div>
  </Router>
  , document.getElementById('root'),
);
