import React from 'react';
import {
  Link,
} from 'react-router-dom';

export default () => ( 
  <header>
    <div className="navbar">
      <ul className="nav">
        <li className="item">
          <Link to="/">Home</Link>
        </li>

        <li className="item">
          <Link to="/board">Write</Link>
        </li>

        <li className="item">
          <a href="#">About</a>
        </li>
      </ul>

      <div className="logo">
        <img src="#" />
      </div>
    </div>
  </header>
);
