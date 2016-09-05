import React from 'react'
import _ from 'lodash'

import TaskCard from 'components/tasks-list/TaskCard'
import TaskFilters from 'components/tasks-list/TaskFilters'

import 'components/tasks-list/tasks-list.scss'

class TasksList extends React.Component {

  // steteless
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='tasks-list'>
        <TaskFilters applyFilter={this.props.applyFilter} />
        {this.renderTasks()}
      </div>
    )
  }

  renderTasks () {
    const handlers = this.props.actionHandlers
    if (!_.isEmpty(this.props.tasks)) {
      return this.props.tasks.map(task => <TaskCard key={task._id} task={task} handlers={handlers} />)
    }
  }
}

TasksList.propTypes = {
  tasks: React.PropTypes.array.isRequired,
  actionHandlers: React.PropTypes.object.isRequired,
  applyFilter: React.PropTypes.func.isRequired
}

export default TasksList
