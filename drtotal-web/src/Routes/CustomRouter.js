import React from 'react';
import {BrowserRouter as Router, Route, Link,Switch} from "react-router-dom";
import {LoginPage} from '../Login/Components/Containers/LoginContainer';
import Redirect from 'react-router-dom/Redirect';
import NavBar  from '../NAV/NavBar'
import {connect} from 'react-redux';
import UserProfile from '../UserProfile/Components/UserProfile';

/**
 * 
 * @param {*} props
 * Detects and redirects to apropriate routes. 
 */
const DrTotalRouter = (props) => <Router>
  <div>
  <Switch>

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
                <UserProfile/>
              </div>
            );
          
            case 'signup':
            return (              
              <Redirect to='/signup'/>
            );
          
            default:
            
            return (              
              <div><NavBar/>
                <p>{JSON.stringify(props.user)} </p>       
              </div>
            );
        }
      } else {

        if(props.showRoles)
            return <Redirect to='/signup'/>            
          return (<Redirect to='/login'/>)
      }
    }}/>

    <Route
      exact
      path="/login"
      component={() => (        
      <LoginPage errorCode=' ' type={props.stage}></LoginPage>
    )}/>

    <Route
    exact
      path="/signup"
      component={() => {
      return (
        <LoginPage errorCode=' ' type='signup'></LoginPage>
      )
    }}/>
    <Route
    
    component={()=>(<h1>hello world!!!!</h1>)}
    />
    </Switch>
  </div>
  

</Router>


const mapStateToProps = (state, ownProps) => {
  if (state.User.login) {    
    return state.User;
  } else {
    return {}
  }
};

export const CustomRouter = connect(mapStateToProps, {})(DrTotalRouter);
