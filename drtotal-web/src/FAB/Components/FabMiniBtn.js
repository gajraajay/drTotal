import React from 'react'

export const FabMiniBtn = (props) => {
  let fabStyle = {
    background: props.backgroundColor,
    color: props.iconColor,
    backgroundImage: "url('" + props.backgroundImage + "')"
  }
  return (
    <li
      className="jqfab-fab-mini-btn"
      something={props.something}
      value={props.value}
      onClick={props.onClick}>
      <p className="jqfab-btn bg-small" style={fabStyle}>
        <i className={"jqfab-icon-mini fa " + props.icon} aria-hidden="true"></i>
      </p>
      <p className="jqfab-tooltip col-xs-10 col-md-10">
        <span className="pull-right">{props.tooltip}</span>
      </p>
    </li>
  )
}

export default FabMiniBtn;