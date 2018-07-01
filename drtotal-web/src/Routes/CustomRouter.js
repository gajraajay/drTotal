import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
// import LoginForm from '../Login/Components/LoginForm';
import { LoginPage } from '../Login/Components/Containers/LoginContainer';
import {Navbar, NavItem,NavDropdown,MenuItem,Nav,Row,FormGroup ,code ,ControlLabel,HelpBlock,Panel,Checkbox}  from 'react-bootstrap';

export const CustomRouter=()=> <Router>
<div>
  <NavBar />
  <Route exact path="/" component={() => (
    <h1>Cool</h1>
  )}/>
  <Route path="/login" component={() => (
    <LoginPage errorCode='this is something fishi' type='login'>        
    </LoginPage>
    
    
  )}/>
  <Route path="/signup" component={() => (
    <LoginPage errorCode='this is something fishi' type='signup'>        
    </LoginPage>   
  )}/>
</div>
</Router>

export const NavBar = () => {

  return(
<Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#brand">React-Bootstrap</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
    <NavItem componentClass={Link} href="/login" to="/login">Login
    </NavItem>
    <NavItem componentClass={Link} href="/signup" to="/signup">SignUp
    </NavItem>
    
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
    <Nav pullRight>
      <NavItem eventKey={1} href="#">
        Link Right
      </NavItem>
      <NavItem eventKey={2} href="#">
        Link Right
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar> 
);  

  
}