import React from 'react'
import Toggle from 'material-ui/Toggle'
import moment from 'moment'

class Filter extends React.Component {

  constructor (props) {
    super(props)
    // Must have state here, since material-ui/Toggle onToggle event do not provide changed value.
    this.state = {
      isSelected: this.props.selected
    }
    this._onToggle = this.onToggle.bind(this)
  }

  onToggle () {
    const newVal = !this.state.isSelected
    if (newVal) {
      this.props.handler(this.props.filterName, this.props.filterSelected)
    } else {
      this.props.handler(this.props.filterName, this.props.filterUnselected)
    }
    this.setState({isSelected: newVal})
  }

  render () {
    const style = { width: '200px' }
    return (
      <Toggle label={this.props.label} onToggle={this._onToggle} style={style} defaultToggled={this.props.selected}
        className={this.props.className} />
    )
  }
}

Filter.propTypes = {
  filterName: React.PropTypes.string.isRequired,
  selected: React.PropTypes.bool.isRequired,
  label: React.PropTypes.string.isRequired,
  className: React.PropTypes.string.isRequired,
  filterUnselected: React.PropTypes.func.isRequired,
  filterSelected: React.PropTypes.func.isRequired,
  handler: React.PropTypes.func.isRequired
}

const AllwaysTrue = (task) => true
const ShowCompletedFilter = (task) => !task.isDone
const ShowOnlyTodays = (task) => moment(task.createdAt).isSame(moment(), 'day')

const TaskFilters = (props) => (
  <div className='tasks-filters'>
    <Filter label='Show completed' selected filterName='completed-filter' className='show-completed-filter'
      filterSelected={AllwaysTrue} filterUnselected={ShowCompletedFilter} handler={props.applyFilter} />
    <Filter label='Created today' selected={false} filterName='only-today-filter' className='created-today-filter'
      filterSelected={ShowOnlyTodays} filterUnselected={AllwaysTrue} handler={props.applyFilter} />
  </div>
)

TaskFilters.propTypes = {
  applyFilter: React.PropTypes.func.isRequired
}

export default TaskFilters
