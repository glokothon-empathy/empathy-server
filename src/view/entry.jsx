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
import Board from './components/Board';
import TipList from './components/TipList';
import TipDetail from './components/TipDetail';

const history = CreateBrowserHistory();

ReactDOM.render(
  <Router basename="/" history={history}>
    <div>
      <Navbar />
      <Route exact path="/" component={IdeaList} />
      <Route exact path="/detail/:idea_id" component={Detail} />
      <Route exact path="/tips" component={TipList} />
      <Route exact path="/tips/:tip_id/detail" component={TipDetail} />
      <Route exact path="/profile/:owner_id" component={Profile} />
      <Route exact path="/board" component={Board} />
    </div>
  </Router>
  , document.getElementById('root'),
);
