import React, {Component} from 'react';
import {
  Alert,
  Button,
  Checkbox,
  code,
  Col,
  Collapse,
  ControlLabel,
  Fade,
  FieldGroup,
  FormControl,
  FormGroup,
  HelpBlock,
  Panel,
  Popover,
  ProgressBar,
  Row,
  Radio
} from 'react-bootstrap';
import Link from 'react-router-dom/Link';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import NavBar from '../../../NAV/NavBar';
import axios from 'axios';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.clearNotification = this
      .clearNotification
      .bind(this);
    this.handleFormSubmit = this
      .handleFormSubmit
      .bind(this);
    this.handleProileUpdate = this
      .handleProileUpdate
      .bind(this);
    // this.selectedOption=this.selectedOption.bind( this );
  }

  static defaultProps = {};
  componentDidMount() {}
  shouldComponentUpdate(nextProps, nextState) {

    console.log(nextProps, nextState);
    return true;
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    console.log("didupdate");
  }
  clearNotification(e, props) {
    this
      .props
      .UpdateNotification();
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const formData = {};
    if (this.props.type == "signup") {
      this
        .props
        .SignUpToServer(this.email.value, this.password.value, this.cnfPassword.value);
    } else {
      this
        .props
        .LoginToServer(this.email.value, this.password.value);
    }
  }
  handleProileUpdate(e) {
    e.preventDefault();
    this
      .props
      .CompleteProfile(this.name.value, this.selectedRole);

  }

  render() {
    if (this.props.User.login == true) {
      if (this.props.data.status == 1 && !this.props.showRoles) {
        return <Redirect to='/'/>
      }
    } else {}
    if (this.props.type != 'signup') {
      return (
        <div className="loginPanel">
          <Col xs={12} md={4} mdOffset={4}>
            <Panel className="p-sm pb-xl" bsStyle="primary">
              <Panel.Body>
                <img
                  className="pb-sm"
                  src="https://graphicdesignbylisa.com/wp-content/uploads/generic-logo.jpg"
                  width="100"/>
                <div className="pb-sm">
                  <h4>Sign in</h4>
                  <h5>to contiue on portal...</h5>
                </div>
                <form className="" onSubmit={this.handleFormSubmit}>
                  <FormGroup validationState={this.props.emailStatus}>
                    <ControlLabel>UserName/Email</ControlLabel>
                    <FormControl
                      inputRef={(ref) => {
                      this.email = ref
                    }}
                      type="text"
                      onChange={this.clearNotification}
                      placeholder="Enter Email/ UserName"/>
                    <HelpBlock
                      className={this.props.emailStatus == 'error'
                      ? ''
                      : 'hide'}>{this.props.emailStatus == 'error'
                        ? this.props.errorMessage
                        : ''}
                    </HelpBlock>
                  </FormGroup>
                  <FormGroup validationState={this.props.passwordStatus}>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                      inputRef={(ref) => {
                      this.password = ref
                    }}
                      className="formControll"
                      type="password"
                      placeholder="Enter password"/>
                    <HelpBlock
                      className={this.props.passwordStatus == 'error'
                      ? ''
                      : 'hide'}>{this.props.passwordStatus == 'error'
                        ? this.props.errorMessage
                        : ''}</HelpBlock>
                  </FormGroup>
                  <FormGroup>
                    <Button bsStyle="primary" type="submit">Sign in</Button>
                  </FormGroup>
                  <FormGroup>
                    <HelpBlock xs={12}>
                      Do not have an Account?
                      <Link to='/signup'>Create Account!</Link>
                    </HelpBlock>
                  </FormGroup>
                </form>
              </Panel.Body>
            </Panel>
          </Col>
        </div>

      );
    } else if (this.props.showRoles == true) {
      return (
        <div>
          <NavBar/>
          <Col xs={12} md={4} mdOffset={4}>
            <Panel>

              <Panel.Heading>
                Tell more about your self.
              </Panel.Heading>

              <Panel.Body>

                {this.props.data.user_id}
                <form onSubmit={this.handleProileUpdate}>
                  <FormGroup validationState={this.props.nameStatus}>
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                      onChange={this.clearNotification}
                      inputRef={(ref) => {
                      this.name = ref
                    }}
                      type="text"
                      placeholder="FirstName LastName"/>
                  </FormGroup>
                  <FormGroup>

                    {this
                      .props
                      .data
                      .roles
                      .map((role, i) => (
                        <Radio
                          onChange={() => {
                          this.selectedRole = role
                        }}
                          inputRef={ref => {
                          role.roleId == 1
                            ? this.selectedRole = role
                            : ''
                        }}
                          name="roleOption"
                          key={role.roleId}
                          defaultChecked={role.roleId == 1
                          ? true
                          : false}>
                          {role.roleName}
                        </Radio>

                      ))}
                  </FormGroup>
                  <FormGroup>
                    <Col smOffset={8} sm={2}>
                      <Button type="submit" bsStyle="primary">Sign in</Button>
                    </Col>
                  </FormGroup>
                </form>
              </Panel.Body>
            </Panel>
          </Col>
        </div>
      );
    } else {
      return (
        <div className="loginPanel">
          <Col xs={12} md={4} mdOffset={4}>
            <Panel className="p-sm pb-xl" bsStyle="primary">
              <Panel.Body>
                <img
                  className="pb-sm"
                  src="https://graphicdesignbylisa.com/wp-content/uploads/generic-logo.jpg"
                  width="100"/>
                <div className="pb-sm">
                  <h4></h4>
                  <h5>one place solution for your healthcare...</h5>
                </div>
                <form onSubmit={this.handleFormSubmit}>
                  <FormGroup validationState={this.props.emailStatus}>
                    <ControlLabel>UserName/Email</ControlLabel>
                    <FormControl
                      inputRef={(ref) => {
                      this.email = ref
                    }}
                      type="text"
                      onChange={this.clearNotification}
                      placeholder="Enter Email/ UserName"/>
                    <HelpBlock
                      className={this.props.emailStatus == 'error'
                      ? ''
                      : 'hide'}>{this.props.emailStatus == 'error'
                        ? this.props.errorMessage
                        : ''}
                    </HelpBlock>
                  </FormGroup>
                  <FormGroup validationState={this.props.passwordStatus}>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                      inputRef={(ref) => {
                      this.password = ref
                    }}
                      className="formControll"
                      onChange={this.clearNotification}
                      type="password"
                      placeholder="Enter password"/>
                    <HelpBlock
                      className={this.props.passwordStatus == 'error'
                      ? ''
                      : 'hide'}>{this.props.passwordStatus == 'error'
                        ? this.props.errorMessage
                        : ''}</HelpBlock>
                  </FormGroup>
                  <FormGroup validationState={this.props.confirmPasswordStatus}>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                      inputRef={(ref) => {
                      this.cnfPassword = ref
                    }}
                      className="formControll"
                      onChange={this.clearNotification}
                      type="password"
                      placeholder="Enter password"/>
                    <HelpBlock
                      className={this.props.confirmPasswordStatus == 'error'
                      ? ''
                      : 'hide'}>{this.props.confirmPasswordStatus == 'error'
                        ? this.props.errorMessage
                        : ''}</HelpBlock>
                  </FormGroup>
                  <FormGroup>
                    <Button bsStyle="primary" type="submit">Enroll me</Button>
                  </FormGroup>
                  <FormGroup>
                    <HelpBlock xs={12}>
                      Already have an account ?
                      <Link to='/login'>LogIn</Link>
                    </HelpBlock>
                  </FormGroup>
                </form>
              </Panel.Body>
            </Panel>

          </Col>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  ownProps = state.User;
  if (ownProps) 
    return ownProps;
  else {
    return {}
  }

};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    ...ownProps,
    dispatch: dispatch
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);