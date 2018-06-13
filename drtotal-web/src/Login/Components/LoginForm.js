import React, {Component} from 'react';
import {Button, ProgressBar,FieldGroup,FormControl,Col,Row,FormGroup ,code ,ControlLabel,HelpBlock,Panel,Checkbox}  from 'react-bootstrap';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import {LoginToServer} from '../Actions/LoginActions';
import { CLICK_SIGN_IN_BUTTON } from '../Actions/types';
class LoginForm extends Component {

  constructor(props) {
    super(props)  
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
  }
  
  handleChange(){
    
    
  }

  handleFormSubmit(e){   
      e.preventDefault();      
      const formData = {};
      for (const field in this.refs) {
        console.log(field);
        formData[field] = this.refs[field].value;
      }
      console.log('-->', formData);
      console.log("Asfas");  
  }

  render() {    
    return (                  
        <Panel>      
          <div onClick={this.handleFormSubmit}>qw fqwfqwfg qwf qwf </div>    
          <ProgressBar now={this.props.amount} />
          <Panel.Heading>Login with your creadential</Panel.Heading>         
          <Panel.Body>          
            <form onSubmit={this.handleFormSubmit}>
              <FormGroup>           
                <ControlLabel>UserName/Email</ControlLabel>
                    <FormControl ref="email" type="text" placeholder="Enter password"/>            
              </FormGroup>
              <FormGroup>           
                <ControlLabel>Password</ControlLabel>
                <FormControl ref="password" className="formControll"   placeholder="Enter password"/>                                                 
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
          </Panel.Body>          
    </Panel>
      
      
    );
  }
}

const mapStateToProps=(state,ownProps)=>{
  console.log("lol");
  ownProps=state.Login.Login; 
  return ownProps;
};

const mapDispatchToProps=function(dispatch,ownProps){
  
    // return {submitTheForm:(e) =>{e.preventDefault();dispatch({
    //   type:CLICK_SIGN_IN_BUTTON,payload:{
    //     login:true
    //   }
    // })}}  
console.log(dispatch);
console.log(ownProps);
    return {};
  
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
// export default connect(mapStateToProps, { LoginToServer })(LoginForm)
// export default connect(mapStateToProps,)(LoginForm);
// export default connect(,  { LoginToServer })(LoginForm);

