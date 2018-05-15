import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
// import LoginForm from '../Login/Components/LoginForm';
import { LoginPage } from '../Login/Components/Containers/LoginPage';

export const CustomRouter = () => (
  <Router>
    <div>
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
      <hr/> */}
      <Route exact path="/" component={() => (
        <h1>Cool</h1>
      )}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/signup" component={() => (
        <h1>Coo12l</h1>
      )}/>
    </div>
  </Router>
)