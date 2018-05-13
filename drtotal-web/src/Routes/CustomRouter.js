import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export const CustomRouter = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Login">login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>

      <hr/>

      <Route exact path="/" component={() => (
        <h1>Cool</h1>
      )}/>
      <Route path="/about" component={() => (
        <h1>Cool1</h1>
      )}/>
      <Route path="/topics" component={() => (
        <h1>Coo12l</h1>
      )}/>
    </div>
  </Router>
)