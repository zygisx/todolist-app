import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

// TODO: define props
class NewTaskForm extends React.Component {

  constructor(props) {
    super(props);

    this.validation = new FormValidation()

    this.state = {
      title: '',
      description: ''
    }
  }

    onSave = () => {
      this.props.onSave(this.state)
    }

    stateChange = (e) => {
      this.setState(
        { [e.target.name]: e.target.value },
        () => this.setState(this.validation.validate(this.state))
      );
    }

    render() {
      return (
        <Paper className="new-task-form" zDepth={2}>
          <TextField
            className="new-task-title"
            fullWidth={true}
            floatingLabelText="Title"
            underlineShow={true}
            name="title"
            onChange={this.stateChange}
            errorText={this.state.titleError}
            />

          <TextField
              className="new-task-description"
              floatingLabelText="Description"
              underlineShow={true}
              multiLine={true}
              rows={3}
              fullWidth={true}
              name="description"
              onChange={this.stateChange}/>

            <RaisedButton className="new-task-button" label="Save" primary={true}
              disabled={this.validation.hasErrors()}
              onClick={this.onSave}/>
            <RaisedButton className="new-task-button" label="Cancel"
              onClick={this.props.onCancel} />
        </Paper>
      );
    }
}

class FormValidation {
  constructor() {
    this._reset();
  }

  validate = (formFields) => {
    this._reset();
    let titleLenght = formFields.title.length
    if (titleLenght === 0) {
      this.errors.titleError = 'Title field is required';
    } else if (titleLenght > 20) {
      this.errors.titleError = "Title field can't be longer then 20 characters";
    } else {
      this.errors.titleError = '';
    }
    return this.errors;
  }

  hasErrors = () => {
    return !!this.errors.titleError;
  }

  _reset = () =>  {
    this.errors = {
      titleError: ''
    }
  }
}

NewTaskForm.propTypes = {
  onCancel: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired
}

module.exports = NewTaskForm;
