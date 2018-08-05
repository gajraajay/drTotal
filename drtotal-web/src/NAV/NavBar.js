import React, {Component} from 'react';
import {
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem,
  Nav,
  Row,
  FormGroup,
  code,
  ControlLabel,
  HelpBlock,
  Panel,
  Checkbox
} from 'react-bootstrap';
import {store} from '../Store';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom/Redirect';
import {CLEAR} from '../Reducers/RootReducer';
import {connect} from 'react-redux';

// class NavMenu extends Component {   render() {     return (       <h1>Hi I am
// Class</h1>     )   } }

class NavBar extends Component {

  handleOnClick = (e) => {
    console.log(e);
  }

  handleSelect(e) {
    switch (e) {
      case 'signout':
        {
          store.dispatch({type: CLEAR});
          // window.location.reload();

          break;
        }
      default:
        console.log("we are here");
    }

  }
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/brand">
              <img
                className="pb-sm"
                src="https://graphicdesignbylisa.com/wp-content/uploads/generic-logo.jpg"
                width="100"/>
            </a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>

          {/* <Nav>
            <NavItem componentClass={Link} href="/login" to="/login">Login
            </NavItem>
            <NavItem componentClass={Link} href="/signup" to="/signup">SignUp
            </NavItem>
            <NavDropdown
              onSelect={this.handleSelect}
              eventKey={'signout'}
              title="Dropdown"
              id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={"signout"}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider/>
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav> */}

          <Nav onSelect={this.handleSelect} pullRight>
            {/* {store
              .getState()
              .User
              .login
              ? (
                <NavItem eventKey={'signout'} href="#">
                  Log out
                </NavItem>
              )
              : (<Redirect to='/login'/>)
} */}
            <NavDropdown
              onSelect={this.handleSelect}
              eventKey={'signout'}
              title={this.props.props.email}
              id="basic-nav-dropdown">
              <MenuItem eventKey={"profile"}>{this.props.props.firstName}</MenuItem>
              <MenuItem eventKey={"signout"}>LogOut</MenuItem>
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>

      </Navbar>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {props: state.Nav.user}

}
export default connect(mapStateToProps, {})(NavBar);