import React, {Component} from 'react';
import {Col,Row,Button}  from 'react-bootstrap';

import LoginForm from "../LoginForm";

export const LoginPage=()=>{


    return( 
           
        <Col xs={12}  md={4} mdOffset={4}>
            <LoginForm/>
        </Col>   
    )
}
