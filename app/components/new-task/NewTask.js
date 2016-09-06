import React from 'react'
import Snackbar from 'material-ui/Snackbar'

import NewTaskCover from 'components/new-task/NewTaskCover'
import NewTaskForm from 'components/new-task/NewTaskForm'

import 'components/new-task/new-task.scss'

class NewTask extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      showCover: true,
      showSnackBar: false,
      snackBarMessage: ''
    }
    this._toogleCover = this.toogleCover.bind(this)
    this._handleSave = this.handleSave.bind(this)
  }

  toogleCover () {
    this.setState({ showCover: !this.state.showCover })
  }

  handleSave (task) {
    const successCallback = () => {
      this.setState({showSnackBar: true, snackBarMessage: 'Task created!'})
      this.toogleCover()
    }
    const errorCallback = (err) => {
      err.bodyPromise.then(body => this.setState(
        {showSnackBar: true, snackBarMessage: `Failed to create task! ${body.message}`}))
    }

    this.props.onNewTask(task).then(successCallback, errorCallback)
  }

  render () {
    return (
      <div className='new-task-container'>
        {this.renderNewTaskCard()}
        {this.renderSnackBar()}
      </div>
    )
  }

  renderNewTaskCard () {
    return (
      this.state.showCover
        ? <NewTaskCover onCoverClick={this._toogleCover} />
        : <NewTaskForm
          onCancel={this._toogleCover}
          onSave={this._handleSave} />
    )
  }

  renderSnackBar () {
    const closeSnackBar = () => {
      this.setState({showSnackBar: false})
    }
    return (
      <Snackbar
        open={this.state.showSnackBar}
        message={this.state.snackBarMessage}
        autoHideDuration={3000}
        onRequestClose={closeSnackBar}
      />
    )
  }
}

NewTask.propTypes = {
  onNewTask: React.PropTypes.func.isRequired
}

export default NewTask
