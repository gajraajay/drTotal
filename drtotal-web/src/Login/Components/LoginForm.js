import React, {Component} from 'react';
import {Button, ProgressBar,FieldGroup,FormControl,Col,Row,FormGroup ,code ,ControlLabel,HelpBlock,Panel,Checkbox}  from 'react-bootstrap';
import Link from 'react-router-dom/Link';
class LoginForm extends Component {
  constructor() {
    super()
  }
  handleChange(){
    console.log("handling changes");
  }
  handleFormSubmit(e){
    e.preventDefault();
    console.log("onSubmit");
  }
  componentWillMount() {}
  render() {    
    return (                  
        <Panel>          
          <ProgressBar now={60} />
          <Panel.Heading>Login with your creadential</Panel.Heading>         
          <Panel.Body>          
            <form onSubmit={this.handleFormSubmit}>
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
export default LoginForm;