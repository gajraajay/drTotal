import React, {Component} from 'react';
import {Button, ProgressBar,FieldGroup,FormControl,Col,Row,FormGroup ,code ,ControlLabel,HelpBlock,Panel,Checkbox}  from 'react-bootstrap';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
// import {LoginToServer} from '../../Actions/LoginActions';

class LoginForm extends Component {

  
  clearNotification(e,props){
    // e.set('validationState',null)
    console.log("we are here",JSON.stringify(e));    
      // this.props.UpdateNotification(this.props);
      // this.props={...this.props,emailStatus:''}

    
  }
  constructor(props) {    
    super(props)          
    console.log(props);
    this.clearNotification=this.clearNotification.bind(this);
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
  }
  static defaultProps = {
    displayprop: 'show'
 };
  
    handleFormSubmit(e){  
      e.preventDefault();      
      const formData = {};  
      if(this.props.type=="signup")    {
        this.props.SignUpToServer(this.email.value,this.password.value,this.cnfPassword.value);

        // this.props.dispatch();
      }else{
      this.props.LoginToServer(this.email.value,this.password.value);
    }
  
  }

  render() {    
    console.log(this.props);
    console.log("before rndor");
    

    if(this.props.Login.login==true){
      if(this.props.data.status==1){


        // console.log(this.props.data.roles);
        // this.props={...this.props,showRoles:true}
        // console.log(this.props);
      }
    }else{
      console.log("not login");
    }
    if(this.props.type!='signup'){
    return (    
      <Col xs={12}  md={4} mdOffset={4}>
      <div>
        {this.props.errorMessage}
      </div>
            <form className="" onSubmit={this.handleFormSubmit}>
              <FormGroup validationState={this.emailStatus}>           
                <ControlLabel>UserName/Email</ControlLabel>
                    <FormControl inputRef={(ref) => {this.email = ref}} type="text"  onChange={this.clearNotification} placeholder="Enter Email/ UserName"/>            
              </FormGroup>
              <FormGroup validationState={this.passwordStatus}>           
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
  }else if(this.props.showRoles==true){
    
  return(<Col xs={12}  md={4} mdOffset={4}>SELECT PROPER OPTION{ this.props.data.roles.map(function(object, i){
    
    return <div><a href="#">{JSON.stringify(object.roleName)}</a></div>
})}
</Col>);
  }else{
    return(<Col xs={12}  md={4} mdOffset={4}>
      <div>
        {this.props.errorMessage}
      </div>
            <form className="" onSubmit={this.handleFormSubmit}>
              <FormGroup>           
                <ControlLabel>UserName/Email</ControlLabel>
                    <FormControl inputRef={(ref) => {this.email = ref}} type="text" placeholder="Email/ Mobile #"/>            
              </FormGroup>
              <FormGroup>           
                <ControlLabel>Password</ControlLabel>
                <FormControl inputRef={(ref)=>{this.password=ref}} className="formControll"   type="password" placeholder="Password"/>                                                 
              </FormGroup>
              <FormGroup>           
                <ControlLabel>Password</ControlLabel>
                <FormControl inputRef={(ref)=>{this.cnfPassword=ref}} className="formControll"   type="password" placeholder=" Retype password"/>                                                 
              </FormGroup>
              <FormGroup>                             
                <Button  bsStyle="primary" type="submit">Enroll me</Button>                
              </FormGroup> 
          </form>
      </Col>);
  }
  }
}

const mapStateToProps=(state,ownProps)=>{    
  ownProps=state.Login;  
  if(ownProps)
  return ownProps;
  else{
    return {}
  }
  
};

const mapDispatchToProps=function(dispatch,ownProps){
    return {...ownProps,dispatch:dispatch};  
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);