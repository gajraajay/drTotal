import React, {Component} from 'react';
import {Col, Row, Button} from 'react-bootstrap';

import LoginForm from "./LoginForm";
import {connect} from 'react-redux';
import {LoginToServer, SignUpToServer, UpdateNotification,CompleteProfile} from '../../Actions/LoginActions';

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}
export const LoginPage = connect(mapStateToProps, {LoginToServer, SignUpToServer, UpdateNotification,CompleteProfile})(LoginForm);
