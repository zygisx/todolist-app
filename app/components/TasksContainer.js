import React from 'react'
import _ from 'lodash'

import NewTask from 'components/new-task/NewTask'
import TasksList from 'components/tasks-list/TasksList'
import TasksService from 'services/TasksService'

class TasksContainer extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      tasks: [],
      filters: {}
    }
    this.updateTasks()

    this.actionHandlers = {
      onDelete: this.handleTaskDelete.bind(this),
      onDone: this.handleTaskDone.bind(this),
      onRepeat: this.handleTaskRepeat.bind(this)
    }
    this._applyFilter = this.applyFilter.bind(this)
  }

  updateTasks () {
    TasksService.all().then(
      (tasks) => this.setState({tasks: tasks, tasksView: tasks})
    )
  }

  handleTaskSave (task) {
    return TasksService.create(task)
            .then(
              () => this.updateTasks())
  }

  handleTaskDelete (task) {
    return TasksService.delete(task._id)
            .then(() => this.updateTasks())
  }

  handleTaskDone (task) {
    task.isDone = true
    return TasksService.update(task)
            .then(() => this.updateTasks())
  }

  handleTaskRepeat (task) {
    task.isDone = false
    return TasksService.update(task)
            .then(() => this.updateTasks())
  }

  handleShowCompleted (showCompleted) {
    this.setState({showCompleted: showCompleted})
  }

  handleShowCompletedCreatedToday (showCreatedToday) {
    this.setState({showCreatedToday: showCreatedToday})
  }

  applyFilter (key, filter) {
    let currentFilters = this.state.filters
    currentFilters[key] = filter
    this.setState({filters: currentFilters})
  }

  tasks () {
    const filters = _.values(this.state.filters)
    let tasks = this.state.tasks
    _.each(filters, f => tasks = _.filter(tasks, f))
    return tasks
  }

  render () {
    return (
      <div className='tasks-container'>
        <NewTask onNewTask={this.handleTaskSave.bind(this)} />
        <TasksList tasks={this.tasks()} actionHandlers={this.actionHandlers} applyFilter={this._applyFilter} />
      </div>
    )
  }
}

export default TasksContainer
