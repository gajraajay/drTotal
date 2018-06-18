import React, {Component} from 'react';
import {Col,Row,Button}  from 'react-bootstrap';

import LoginForm from "./LoginForm";
import { connect } from 'react-redux';
const mapStateToProps = (state, ownProps) => {
  console.log("we are here with LoginCongtainer",state);
  console.log("we are here with LoginCongtainer own",ownProps);
  return {
    "cool": "clickme"
  }
}
export const LoginPage= connect(mapStateToProps,()=>{})(LoginForm);
