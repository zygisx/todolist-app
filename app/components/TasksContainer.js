import React from 'react'

import NewTask from 'components/new-task/NewTask'
import TaskCard from 'components/tasks-list/TaskCard'

import TasksService from 'services/TasksService'

class TasksContainer extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        tasks: []
      }
      this.updateTasks()
    }


    updateTasks() {
      console.log("updating")
      TasksService.all().then(
        (tasks) => this.setState({tasks: tasks})
      )
    }

    handleTaskSave(task) {
      return TasksService.create(task)
              .then(() => this.updateTasks())
    }

    handleTaskDelete(task) {
      return TasksService.delete(task.id)
              .then(() => this.updateTasks())
    }

    handleTaskDone(task) {
      task.isDone = true;
      return TasksService.update(task)
              .then(() => this.updateTasks())
    }

    handleTaskRepeat(task) {
      task.isDone = false;
      return TasksService.update(task)
              .then(() => this.updateTasks())
    }

    render() {
      return (
        <div>
          <NewTask onNewTask={this.handleTaskSave.bind(this)}/>
          {this.renderTasks()}
        </div>
      );
    }

    renderTasks() {
      console.log("rendering");
      const handlers = {
        onDelete: this.handleTaskDelete.bind(this),
        onDone: this.handleTaskDone.bind(this),
        onRepeat: this.handleTaskRepeat.bind(this)
      }

      const tasks = this.state.tasks;
      if (!_.isEmpty(tasks)) {
        return tasks.map(task => <TaskCard key={task.id} task={task} {...handlers}/>)
      }
    }


}

module.exports = TasksContainer;
