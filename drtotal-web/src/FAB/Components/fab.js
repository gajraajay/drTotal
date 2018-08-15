import React from 'react'

export const FAB = (props) => {
  console.log(props.children);
  return (
    
      <div className="fab-wrpper">
        <ul className="jqfab-container col-xs-1 col-md-1 pull-right">
          {props.children}
          <li className="jqfab-fab-btn">
            <p className="jqfab-btn rotate bg-primary">
              <i className="jqfab-icon fa fa-plus fa-lg hover-hide" aria-hidden="true"></i>
              <i className="jqfab-icon fa fa-pencil fa-lg hover-show" aria-hidden="true"></i>
            </p>
          </li>
        </ul>
      </div>
    
  )
}