import React, {Component} from 'react';
import {Button, ProgressBar,FieldGroup,FormControl,Col,Row,FormGroup ,code ,ControlLabel,HelpBlock,Panel,Checkbox}  from 'react-bootstrap';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import {LoginToServer} from '../../Actions/LoginActions';

class LoginForm extends Component {
  constructor(props) {
    super(props)          
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
  }
  static defaultProps = {
    displayprop: 'show'
 };
  
    handleFormSubmit(e){   
      e.preventDefault();      
      const formData = {};      
      this.props.LoginToServer(this.email.value,this.password.value);
  
  }

  render() {    
    return (    
      <Col xs={12}  md={4} mdOffset={4}>
      <div>
        {this.props.errorCode}
      </div>
            <form className="" onSubmit={this.handleFormSubmit}>
              <FormGroup>           
                <ControlLabel>UserName/Email</ControlLabel>
                    <FormControl inputRef={(ref) => {this.email = ref}} type="text" placeholder="Enter password"/>            
              </FormGroup>
              <FormGroup>           
                <ControlLabel>Password</ControlLabel>
                <FormControl inputRef={(ref)=>{this.password=ref}} className="formControll"   type="password" placeholder="Enter password"/>                                                 
              </FormGroup>
              <FormGroup>                 
                  <Checkbox>Remember me</Checkbox>                  
              </FormGroup>
              <FormGroup>                             
                <Button  bsStyle="primary" type="submit">Sign in</Button>                
              </FormGroup>            
              <FormGroup>                             
                <Col xs={12}> Do not have an Account? <Link to='/signup'>Create Account!</Link></Col>
              </FormGroup>                             
          </form>
      </Col>
      
    );
  }
}

const mapStateToProps=(state,ownProps)=>{  
  console.log("props",state.Login);
  ownProps=state.Login;  
  if(ownProps)
  return ownProps;
  else{
    return {}
  }
  
};

const mapDispatchToProps=function(dispatch,ownProps){
    return {};  
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);