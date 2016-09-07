import React from 'react'
import { assert } from 'chai'
import sinon from 'sinon'
import { mountMui, today, yesterday } from './helpers'
import _ from 'lodash'

import TaskFilters from 'components/tasks-list/TaskFilters'

/* global describe it */
describe('TaskFilter component', () => {
  const tasks = [
    {_id: 1, isDone: true, createdAt: today},
    {_id: 2, isDone: true, createdAt: yesterday},
    {_id: 3, isDone: false, createdAt: today},
    {_id: 4, isDone: false, createdAt: yesterday}
  ]
  const filteredIds = (filter) => {
    const filtered = _.filter(tasks, filter)
    return _.map(filtered, t => t._id)
  }

  it('"created today" filter should remove yesterday tasks', () => {
    const spy = sinon.spy()
    const wrapper = mountMui(
      <TaskFilters applyFilter={spy} />
    )
    const filterToggle = wrapper.find('.created-today-filter input')
    filterToggle.simulate('change')
    assert(spy.calledOnce)
    const [key, filter] = spy.args[0]
    assert.equal(key, 'only-today-filter')
    assert.deepEqual(filteredIds(filter), [1, 3]) // only todays ids
  })
  it('"created today" unselected filter have no effect', () => {
    const spy = sinon.spy()
    const wrapper = mountMui(
      <TaskFilters applyFilter={spy} />
    )
    const filterToggle = wrapper.find('.created-today-filter input')
    filterToggle.simulate('change')
    filterToggle.simulate('change') // double change should be same as unselected
    assert(spy.calledTwice)
    const [key, filter] = spy.args[1]
    assert.equal(key, 'only-today-filter')
    assert.deepEqual(filteredIds(filter), [1, 2, 3, 4])
  })
  it('"show done" filter should show all tasks by default', () => {
    const spy = sinon.spy()
    const wrapper = mountMui(
      <TaskFilters applyFilter={spy} />
    )
    const filterToggle = wrapper.find('.show-completed-filter input')
    filterToggle.simulate('change')
    filterToggle.simulate('change') // double change makes it its default value
    assert(spy.calledTwice)
    const [key, filter] = spy.args[1]
    assert.equal(key, 'completed-filter')
    assert.deepEqual(filteredIds(filter), [1, 2, 3, 4])
  })
  it('"show done" filter should hide done tasks', () => {
    const spy = sinon.spy()
    const wrapper = mountMui(
      <TaskFilters applyFilter={spy} />
    )
    const filterToggle = wrapper.find('.show-completed-filter input')
    filterToggle.simulate('change')
    assert(spy.calledOnce)
    const [key, filter] = spy.args[0]
    assert.equal(key, 'completed-filter')
    assert.deepEqual(filteredIds(filter), [3, 4])
  })
})
