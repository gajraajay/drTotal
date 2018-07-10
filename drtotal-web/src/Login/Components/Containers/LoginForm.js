import React, {Component} from 'react';
import {Button,Collapse,Fade,Popover, ProgressBar,FieldGroup,FormControl,Col,Row,FormGroup ,code ,Alert,ControlLabel,HelpBlock,Panel,Checkbox}  from 'react-bootstrap';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
// import {LoginToServer} from '../../Actions/LoginActions';

class LoginForm extends Component {

  constructor(props) {    
    super(props)          
    
    this.clearNotification=this.clearNotification.bind(this);
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
  }
  static defaultProps = {
    // displayprop: 'show'
 };


  clearNotification(e,props){    
      this.props.UpdateNotification();   
  }
  handleFormSubmit(e){  
    e.preventDefault();      
      const formData = {};  
      if(this.props.type=="signup")    {
        
        this.props.SignUpToServer(this.email.value,this.password.value,this.cnfPassword.value);
      }else{
      this.props.LoginToServer(this.email.value,this.password.value);
    }  
  }  


  render() {    
      if(this.props.Login.login==true){
      if(this.props.data.status==1){
      }
    }else{
      
    }
    if(this.props.type!='signup'){
    return (    
      <div className="loginPanel">
      <Col xs={12}  md={4} mdOffset={4}>
      <Panel className="p-sm pb-xl" bsStyle="primary">
        <Panel.Body>
          <img className="pb-sm" src="https://graphicdesignbylisa.com/wp-content/uploads/generic-logo.jpg" width="100" />
           <div className="pb-sm"><h4>Sign in</h4><h5>to contiue on portal...</h5></div>
            <form className="" onSubmit={this.handleFormSubmit}>
              <FormGroup validationState={this.props.emailStatus}>           
                <ControlLabel>UserName/Email</ControlLabel>
                    <FormControl inputRef={(ref) => {this.email = ref}} type="text"  onChange={this.clearNotification} placeholder="Enter Email/ UserName"/>                                                    
                    <HelpBlock className={this.props.emailStatus=='error'? '':'hide'}>{this.props.emailStatus=='error' ? this.props.errorMessage : ''} </HelpBlock>
              </FormGroup>
              <FormGroup validationState={this.props.passwordStatus}>           
                <ControlLabel>Password</ControlLabel>
                <FormControl inputRef={(ref)=>{this.password=ref}} className="formControll"   type="password" placeholder="Enter password"/>                                                 
                <HelpBlock className={this.props.passwordStatus=='error'? '':'hide'}>{this.props.passwordStatus=='error'? this.props.errorMessage :''}</HelpBlock>
              </FormGroup>
              <FormGroup>                             
                <Button  bsStyle="primary" type="submit">Sign in</Button>                
              </FormGroup>            
              <FormGroup>                             
                <HelpBlock xs={12}> Do not have an Account? <Link to='/signup'>Create Account!</Link></HelpBlock>
              </FormGroup>                             
          </form>
          </Panel.Body>
      </Panel>      
      </Col>
      </div>
      
    );
  }else if(this.props.showRoles==true){
    
  return(<Col xs={12}  md={4} mdOffset={4}>SELECT PROPER OPTION{ this.props.data.roles.map(function(object, i){
    
    return <div><a href="#">{JSON.stringify(object.roleName)}</a></div>
})}
</Col>);
  }else{
    return(
      <div className="loginPanel">
      <Col xs={12}  md={4} mdOffset={4}>
      <Panel className="p-sm pb-xl" bsStyle="primary">
        <Panel.Body>                
        <img className="pb-sm" src="https://graphicdesignbylisa.com/wp-content/uploads/generic-logo.jpg" width="100" />
           <div className="pb-sm"><h4></h4><h5>one place solution for your healthcare...</h5></div>
            <form  onSubmit={this.handleFormSubmit}>
            <FormGroup validationState={this.props.emailStatus}>                   
                <ControlLabel>UserName/Email</ControlLabel>                    
                    <FormControl inputRef={(ref) => {this.email = ref}} type="text"  onChange={this.clearNotification} placeholder="Enter Email/ UserName"/>                                                    
                    <HelpBlock className={this.props.emailStatus=='error'? '':'hide'}>{this.props.emailStatus=='error' ? this.props.errorMessage : ''} </HelpBlock>
              </FormGroup>
              <FormGroup validationState={this.props.passwordStatus}>           
                <ControlLabel>Password</ControlLabel>                
                <FormControl inputRef={(ref)=>{this.password=ref}} className="formControll" onChange={this.clearNotification}   type="password" placeholder="Enter password"/>                                                 
                <HelpBlock className={this.props.passwordStatus=='error'? '':'hide'}>{this.props.passwordStatus=='error'? this.props.errorMessage :''}</HelpBlock>
              </FormGroup>
              <FormGroup validationState={this.props.confirmPasswordStatus}>           
                <ControlLabel>Password</ControlLabel>                
                <FormControl inputRef={(ref)=>{this.cnfPassword=ref}} className="formControll"  onChange={this.clearNotification}  type="password" placeholder="Enter password"/>                                                 
                <HelpBlock className={this.props.confirmPasswordStatus=='error'? '':'hide'}>{this.props.confirmPasswordStatus=='error'? this.props.errorMessage :''}</HelpBlock>
              </FormGroup>
              <FormGroup>                             
                <Button  bsStyle="primary" type="submit">Enroll me</Button>                
              </FormGroup> 
              <FormGroup>                             
                <HelpBlock xs={12}> Already have an account ? <Link to='/login'>LogIn</Link></HelpBlock>
              </FormGroup>                             
          </form>
          </Panel.Body>
          </Panel>
        
      </Col></div>);
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