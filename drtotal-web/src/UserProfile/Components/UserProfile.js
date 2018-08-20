import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Panel, Button} from 'react-bootstrap';
import {FloatingMenu, MainButton, ChildButton} from 'react-floating-button-menu';
import MdAdd from 'react-icons/lib/md/add';
import MdClose from 'react-icons/lib/md/close';
import {FAB} from '../../FAB/Components/fab';
import {FabMiniBtn} from '../../FAB/Components/FabMiniBtn';
class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.handleOnclick = this
      .handleOnclick
      .bind(this);
  }
  handleOnclick(data) {
    console.log(data.currentTarget.something);
  }
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
          <FAB>
            <FabMiniBtn
              something='as asasg asfas'
              value='cool thi is fun'
              onClick={this.handleOnclick}
              tooltip="click me"
              backgroundImage="https://material.io/tools/icons/static/ic_icons_192px_light.svg"
              backgroundColor="#FFF"
              iconColor='#000'/>
            <FabMiniBtn
              tooltip="help"
              backgroundImage="https://material.io/tools/icons/static/ic_icons_192px_light.svg"
              backgroundColor="#FFF"
              iconColor='#000'/>
            <FabMiniBtn
              tooltip="help"
              backgroundImage="https://material.io/tools/icons/static/ic_icons_192px_light.svg"
              backgroundColor="#FFF"
              iconColor='#000'/>
            <FabMiniBtn
              tooltip="help"
              backgroundImage="https://material.io/tools/icons/static/ic_icons_192px_light.svg"
              backgroundColor="#FFF"
              iconColor='#000'/>
            <FabMiniBtn
              tooltip="help"
              backgroundImage="https://material.io/tools/icons/static/ic_icons_192px_light.svg"
              backgroundColor="#FFF"
              iconColor='#000'/>
            <FabMiniBtn
              tooltip="help"
              backgroundColor="#FF5"
              iconColor='#000'
              icon="fa-plus"/>
          </FAB>
        </div>
        <div
          className="col-xs-12"
          style={{
          position: 'fixed',
          bottom: '10px',
          right: '500px'
        }}>
          {/* <FAB>
            <FabMiniBtn
              tooltip="help"
              backgroundImage="https://material.io/tools/icons/static/ic_icons_192px_light.svg"
              backgroundColor="#FFF"
              iconColor='#000'/>
            <FabMiniBtn tooltip="help" backgroundColor="#FF5" iconColor='#000' icon="fa-plus"/>
            <FabMiniBtn
              tooltip="help"
              backgroundColor="#FFF"
              icon="fa-plus"
              iconColor='#000'/>
            <FabMiniBtn
              tooltip="help"
              backgroundImage="https://material.io/tools/icons/static/ic_icons_192px_light.svg"
              backgroundColor="#FFF"
              iconColor='#000'/>
            <FabMiniBtn
              tooltip="help"
              backgroundImage="https://material.io/tools/icons/static/ic_icons_192px_light.svg"
              backgroundColor="#FFF"
              iconColor='#000'/>
          </FAB> */}
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
    options: () => {
      for (var i = 0; i < 3; i++) {
        return (
          <li className="jqfab-fab-mini-btn">
            <p className="jqfab-btn bg-small">
              <i className="jqfab-icon-mini fa fa-pencil-square-o" aria-hidden="true"></i>
            </p>
            <p className="jqfab-tooltip col-xs-10 col-md-10">
              <span className="pull-right">Max this size + someone</span>
            </p>
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