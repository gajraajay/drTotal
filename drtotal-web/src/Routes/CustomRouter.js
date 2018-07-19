import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {LoginPage} from '../Login/Components/Containers/LoginContainer';
import Redirect from 'react-router-dom/Redirect';
import {NavBar} from '../NAV/NavBar'
import {connect} from 'react-redux';
import { Navbar } from 'react-bootstrap';
import LoginForm from '../Login/Components/Containers/LoginForm';




const DrTotalRouter = (props) => <Router>
  <div>
    <Route
      exact
      path="/"
      component={() => {
      if (props.login) {
        switch (props.stage) {
          case 'login':
          if(props.showRoles)
            return <Redirect to='/signup'/>  

            return (              
              <div><NavBar/>
                <p>{JSON.stringify(props.user)} </p>       
              </div>
            );
          
            case 'signup':
            return (              
              <Redirect to='/signup'/>
            );
          default:
            return (
              <h1>Cool</h1>
            );
        }
      } else {
        if(props.showRoles)
            return <Redirect to='/signup'/>            
        return (<Redirect to='/login'/>)
      }
    }}/>

    <Route
      path="/login"
      component={() => (
      <LoginPage errorCode='this is something fishi' type='login'></LoginPage>
    )}/>

    <Route
      path="/signup"
      component={() => {
      return (
        <LoginPage errorCode='this is something fishi' type='signup'></LoginPage>
      )
    }}/>
  </div>
</Router>
const mapStateToProps = (state, ownProps) => {
  if (state.Login.login) {
    console.log(state.Login)
    return state.Login;
  } else {
    return {}
  }
};
export const CustomRouter = connect(mapStateToProps, {})(DrTotalRouter);
