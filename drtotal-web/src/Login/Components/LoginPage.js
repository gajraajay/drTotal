import React, {Component} from 'react';
import { FormControl,FormGroup ,ControlLabel,HelpBlock}  from 'react-bootstrap';
class LoginPage extends Component {
  constructor() {
    super()
  }
  componentWillMount() {}
  render() {
    return (
      <div>
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState>
            <ControlLabel>Working example with validation</ControlLabel>
            <FormControl
              type="text"
              value
              placeholder="Enter text"
              />
            <FormControl.Feedback/>
            <HelpBlock>Validation is based on string length.</HelpBlock>
          </FormGroup>
        </form>
      </div>
    );
  }
}
export default LoginPage;