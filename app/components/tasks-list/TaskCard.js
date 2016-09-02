import React from 'react'
import {CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import AvReplay from 'material-ui/svg-icons/av/replay'
import RaisedButton from 'material-ui/RaisedButton'
import {grey500, grey900} from 'material-ui/styles/colors'

import CardNoShadow from 'components/common/CardNoShadow'
import TaskActions from 'components/tasks-list/TaskActions'

import 'components/tasks-list/tasks-list.scss'

// TODO: no state???
class TaskCard extends React.Component {

    constructor(props) {
      super(props)
      this.state = {}
    }

    deleteCard() {
      console.log("Deleting card")
    }

    render() {
      return (
        <div className="task-container">
          <CardNoShadow className={`task-card ${this.props.task.isDone ? 'task-done' : ''}`}>
            <CardHeader
              className="task-header"
              title={this.props.task.title}
              titleStyle={this.titleStyle()}
              actAsExpander={true}
              showExpandableButton={true}
              />
            <CardText expandable={true}>
                {this.props.task.description}
            </CardText>
            <TaskActions
              onDelete={this.handlerFn('onDelete')}
              onDone={this.handlerFn('onDone')}
              onRepeat={this.handlerFn('onRepeat')}
              {...this.actionsShowParams()}
              />
          </CardNoShadow>
        </div>
      );
    }

    handlerFn(fnName) {
      return () => this.props[fnName](this.props.task)
    }

    titleStyle() {
      if (this.props.task.isDone) {
        return { textDecoration: 'line-through' }
      } else return {}
    }

    actionsShowParams() {
      if (this.props.task.isDone) {
        return {showDone: false}
      } else {
        return {showRepeat: false}
      }
    }
}

TaskCard.propTypes = {
  task: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired,
      isDone: React.PropTypes.bool.isRequired
    }).isRequired,

  onDelete: React.PropTypes.func.isRequired,
  onDone: React.PropTypes.func.isRequired,
  onRepeat: React.PropTypes.func.isRequired,
}

module.exports = TaskCard;
