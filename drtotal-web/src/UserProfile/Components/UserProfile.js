import React, {Component} from 'react';
import {connect} from 'react-redux';
import{Row,Col,Panel,Button} from 'react-bootstrap';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from 'react-floating-button-menu';
import MdAdd from 'react-icons/lib/md/add';
import MdClose from 'react-icons/lib/md/close';
 
class UserProfile extends Component {

  render() {
    return (
<div>
    <Col xs={12} md={3}>      
        <Panel>
        <Panel.Title>Card title</Panel.Title>
          <Panel.Body>
              <p>{this.props.user.firstName}</p>
              <p>{this.props.user.lastName}</p>
              <p>{this.props.user.email}</p>
              <p>{this.props.role.roleName}</p>            
            <Button>Button</Button>
          </Panel.Body>
        </Panel>
      
      </Col>
       <div className="col-xs-12 main-wrapper">
        <div className="fab-wrapper">
            <ul className="jqfab-container col-xs-1 col-md-1 pull-right">                
                <li className="jqfab-fab-mini-btn">
                    <p className="jqfab-btn bg-small"><i className="jqfab-icon-mini fa fa-pencil-square-o" aria-hidden="true"></i></p>
                    <p className="jqfab-tooltip col-xs-10 col-md-10"><span className="pull-right">Max this size + someone</span></p>
                </li>                
                {this.props.options()}
                
                <li className="jqfab-fab-mini-btn">
                    <p className="jqfab-btn bg-small"><i className="jqfab-icon-mini fa fa-plus" aria-hidden="true"></i></p>
                    <p className="jqfab-tooltip col-xs-10 col-md-10"><span className="pull-right">{ this.props.user.firstName }</span></p>
                </li>
                <li className="jqfab-fab-btn">
                    <p className="jqfab-btn rotate bg-primary">
                    
                        <i className="jqfab-icon fa fa-plus fa-lg hover-hide" aria-hidden="true"></i>
                        <i className="jqfab-icon fa fa-pencil fa-lg hover-show" aria-hidden="true"></i>
                    </p>
                  
                </li>            
            </ul>
        </div>
    </div>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    user: state.User.user,
    role: state.User.role.Role,
    options:()=>{
     for(var i=0;i<3;i++){
      return(
        <li className="jqfab-fab-mini-btn">
          <p className="jqfab-btn bg-small"><i className="jqfab-icon-mini fa fa-pencil-square-o" aria-hidden="true"></i></p>
          <p className="jqfab-tooltip col-xs-10 col-md-10"><span className="pull-right">Max this size + someone</span></p>
        </li>  
      )
    }
    }
  };
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    ...ownProps,
    dispatch: dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);