import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import {CardHeader, CardText} from 'material-ui/Card'

import CardNoShadow from 'components/common/CardNoShadow'
import TaskActions from 'components/tasks-list/TaskActions'

const titleStyle = (task) => {
  if (task.isDone) {
    return { textDecoration: 'line-through' }
  } else return {}
}

const handlerFunctions = (props) => {
  return _.mapValues(props.handlers, (handler) => () => handler(props.task))
}

const actionsShowParams = (task) => {
  if (task.isDone) {
    return {showDone: false}
  } else {
    return {showRepeat: false}
  }
}

const createdAt = (date) => moment(date).format('D MMM, YYYY')

const TaskCard = (props) => (
  <div className='task-container'>
    <CardNoShadow className={`task-card ${props.task.isDone ? 'task-done' : ''}`}>
      <CardHeader
        className='task-header'
        title={props.task.title}
        titleStyle={titleStyle(props.task)}
        actAsExpander
        showExpandableButton
        />
      <CardText expandable>
          {props.task.description}
      </CardText>
      <TaskActions
        {...handlerFunctions(props)}
        {...actionsShowParams(props.task)}
        />
      <span className='task-date'>{createdAt(props.task.createdAt)}</span>
    </CardNoShadow>
  </div>
)

TaskCard.propTypes = {
  task: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    isDone: React.PropTypes.bool.isRequired,
    createdAt: React.PropTypes.string.isRequired
  }).isRequired,

  handlers: React.PropTypes.object.isRequired
}

module.exports = TaskCard
