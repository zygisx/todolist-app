import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import _ from 'lodash'
import FormValidation from 'utils/FormValidation'

class NewTaskForm extends React.Component {

  constructor (props) {
    super(props)
    this.validation = new NewTaskFormValidation()
    this.state = {
      title: '',
      description: '',
      errors: {}
    }
    this._onSave = this.onSave.bind(this)
    this._onStateChange = this.onStateChange.bind(this)
  }

  onSave () {
    const taskPrepared = _.omit(this.state, 'errors')
    this.props.onSave(taskPrepared)
  }

  onStateChange (e) {
    this.setState(
      { [e.target.name]: e.target.value },
      this.validate
    )
  }

  validate () {
    this.setState({
      errors: this.validation.validate(this.state)
    })
  }

  render () {
    return (
      <Paper className='new-task-form' zDepth={2}>
        <TextField
          className='new-task-title'
          fullWidth
          floatingLabelText='Title'
          underlineShow
          name='title'
          onChange={this._onStateChange}
          errorText={this.state.errors.title}
          />

        <TextField
          className='new-task-description'
          floatingLabelText='Description'
          underlineShow
          multiLine
          rows={3}
          fullWidth
          name='description'
          onChange={this._onStateChange} />
        <div className='new-task-form-actions'>
          <RaisedButton className='new-task-action-button' label='Save' primary
            disabled={this.validation.hasErrors()}
            onClick={this._onSave} />
          <RaisedButton className='new-task-action-button' label='Cancel'
            onClick={this.props.onCancel} />
        </div>
      </Paper>
    )
  }
}

NewTaskForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired
}

class NewTaskFormValidation extends FormValidation {
  constructor () {
    super({
      title: ''
    })
  }

  validateInternal (formFields) {
    let titleLenght = formFields.title.length
    if (titleLenght === 0) {
      this.errors.title = 'Title field is required'
    } else if (titleLenght > 20) {
      this.errors.title = "Title field can't be longer then 20 characters"
    } else {
      this.errors.title = ''
    }
  }
}

export default NewTaskForm
