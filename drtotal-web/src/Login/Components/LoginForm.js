import React, {Component} from 'react';
import {Button, ProgressBar,FieldGroup,FormControl,Col,Row,FormGroup ,code ,ControlLabel,HelpBlock,Panel,Checkbox}  from 'react-bootstrap';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import {LoginToServer} from '../Actions/LoginActions';
import { CLICK_SIGN_IN_BUTTON } from '../Actions/types';
class LoginForm extends Component {

  constructor(props) {
    super(props)
    console.log(this.props);    
  }
  handleChange(){
    
    
  }
  handleFormSubmit(e){   
      e.preventDefault();
      this.props.submitTheForm();
      console.log("Asfas");  
  }
  componentWillMount() {
    // this.props.LoginToServer();
  }
  render() {    
    return (                  
        <Panel>          
          <ProgressBar now={this.props.amount} />
          <Panel.Heading>Login with your creadential</Panel.Heading>         
          <Panel.Body>          
            <form onSubmit={this.props.LoginToServer}>
              <FormGroup>           
                <ControlLabel>UserName/Email</ControlLabel>
                    <FormControl type="text" placeholder="Enter text"/>            
              </FormGroup>
              <FormGroup>           
                <ControlLabel>Password</ControlLabel>
                <FormControl type="password"  placeholder="Enter text"/>                                                 
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
  ownProps=(state.Login.Login);
  
  console.log(ownProps);
  return ownProps;
};

const mapDispatchToProps=function(dispatch,ownProps){
    return {submitTheForm:(e) =>{e.preventDefault();dispatch({
      type:CLICK_SIGN_IN_BUTTON,payload:{
        login:true
      }
    })}}  
  
}
export default connect(mapStateToProps, { LoginToServer })(LoginForm)
// export default connect(mapStateToProps,)(LoginForm);
// export default connect(,  { LoginToServer })(LoginForm);

