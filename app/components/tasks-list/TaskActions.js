import React from 'react'
import CardActions from 'material-ui/Card'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import AvReplay from 'material-ui/svg-icons/av/replay'
import {grey500, grey900} from 'material-ui/styles/colors'

const containerStyle = {
  boxShadow: 'none',
  backgroundColor: false
}

const iconStyles = {
  width: '20px'
}

const actionIconProps = {
  className: "task-action-icon md-18",
  color: grey500,
  hoverColor: grey900,
  style: iconStyles
}

const TaskActions = (props) => (
  <CardActions className="task-card-actions" style={containerStyle}>
    {props.showDelete ? <ActionDelete  {...actionIconProps} onClick={props.onDelete}/> : null}
    {props.showDone   ? <ActionCheckCircle {...actionIconProps} onClick={props.onDone}/> : null}
    {props.showRepeat ? <AvReplay {...actionIconProps} onClick={props.onRepeat}/> : null}
  </CardActions>
)

TaskActions.propTypes = {
  onDelete: React.PropTypes.func.isRequired,
  onDone: React.PropTypes.func.isRequired,
  onRepeat: React.PropTypes.func.isRequired,

  showDelete: React.PropTypes.bool,
  showDone: React.PropTypes.bool,
  showRepeat: React.PropTypes.bool
}

TaskActions.defaultProps = {
  showDelete: true,
  showDone: true,
  showRepeat: true
}

module.exports = TaskActions;
