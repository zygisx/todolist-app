import React from 'react'

import 'components/_common.scss'

import TasksContainer from 'components/TasksContainer'
import Header from 'components/Header'

class App extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <TasksContainer />
      </div>
    )
  }
}

export default App
