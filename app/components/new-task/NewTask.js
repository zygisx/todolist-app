import React from 'react';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

import NewTaskCover from 'components/new-task/NewTaskCover';
import NewTaskForm from 'components/new-task/NewTaskForm';

import 'components/new-task/new-task.scss';


// TODO: refactor to stateless
class NewTask extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        showCover: true,
        showSnackBar: false,
        snackBarMessage: ''
      };
    }

    toogleCover = () => {
      this.setState({ showCover: !this.state.showCover });
    }

    handleSave = (task) => {
      const successCallback = () => {
        this.setState({showSnackBar: true, snackBarMessage: "Task created!"});
        this.toogleCover();
      }

      this.props.onNewTask(task).then(
        () => successCallback(),
        (err) => console.log(err)
      )
    }



    render() {
        return (
            <div className="new-task-container">
              {this.renderNewTaskCard()}
              {this.renderSnackBar()}
            </div>
        );
    }

    renderNewTaskCard() {
      return (
        this.state.showCover
          ? <NewTaskCover onCoverClick={this.toogleCover}/>
          : <NewTaskForm
              onCancel={this.toogleCover}
              onSave={this.handleSave}/>
      )
    }

    renderSnackBar() {
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

module.exports = NewTask;
