import React from 'react'
import {CardHeader, CardText} from 'material-ui/Card'
import moment from 'moment'

import CardNoShadow from 'components/common/CardNoShadow'
import TaskActions from 'components/tasks-list/TaskActions'

import 'components/tasks-list/tasks-list.scss'

const titleStyle = (task) => {
  if (task.isDone) {
    return { textDecoration: 'line-through' }
  } else return {}
}

const handlerFn = (props, fnName) => {
  return () => props[fnName](props.task)
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
      // FIXME!
      <CardText expandable>
          {props.task.description}
      </CardText>
      <TaskActions
        onDelete={handlerFn(props, 'onDelete')}
        onDone={handlerFn(props, 'onDone')}
        onRepeat={handlerFn(props, 'onRepeat')}
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

  onDelete: React.PropTypes.func.isRequired,
  onDone: React.PropTypes.func.isRequired,
  onRepeat: React.PropTypes.func.isRequired
}

module.exports = TaskCard
