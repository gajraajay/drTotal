import React, {Component} from 'react';
import {connect} from 'react-redux';
import{Row,Col,Panel,Button} from 'react-bootstrap';

class UserProfile extends Component {

  render() {
    return (
<div>
    <Col xs={12} md={3}>      
        <Panel>
        <Panel.Title>Card title</Panel.Title>
          <Panel.Body>
              <p>{this.props.user.firstName}</p>
              <p>{this.props.user.lastName}</p>
              <p>{this.props.user.email}</p>
              <p>{this.props.role.roleName}</p>            
            <Button>Button</Button>
          </Panel.Body>
        </Panel>
      
      </Col>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  console.log(ownProps);
  return {
    ...state,
    user: state.User.user,
    role: state.User.role.Role
  };
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    ...ownProps,
    dispatch: dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);