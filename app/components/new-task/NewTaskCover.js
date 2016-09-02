import React from 'react'
import CardNoShadow from 'components/common/CardNoShadow'

import 'components/new-task/new-task.scss'


const NewTaskCover = (props) => (
  <CardNoShadow
    className='new-task-box'
    onClick={props.onCoverClick}
    children={<span className='new-task-text'>Add new task...</span>}
  />
)

NewTaskCover.propTypes = {
  onCoverClick: React.PropTypes.func.isRequired
}

module.exports = NewTaskCover;
