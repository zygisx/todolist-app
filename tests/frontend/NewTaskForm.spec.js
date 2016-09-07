import React from 'react'
import { assert } from 'chai'
import sinon from 'sinon'
import { mountMui } from './helpers'

import NewTaskForm from 'components/new-task/NewTaskForm'

/* global describe it */
describe('NewTaskForm component', () => {
  const assertErrorMessageNotEmpty = (wrapper) => {
    assert.isAtLeast(wrapper.state('errors').title.length, 5)
  }
  const assertErrorMessageEmpty = (wrapper) => {
    assert.equal(wrapper.state('errors').title, '')
  }
  const noOp = () => false

  it('should validate that title no longer then 20 symbols', () => {
    const wrapper = mountMui(
      <NewTaskForm onSave={noOp} onCancel={noOp} />)

    const titleInput = wrapper.find('.new-task-title input')
    assert.equal(titleInput.length, 1)

    titleInput.simulate('change', {target: {name: 'title', value: 'length is 20 chars'}})
    assertErrorMessageEmpty(wrapper)
    titleInput.simulate('change', {target: {name: 'title', value: 'length is 21 chars..!'}})
    assertErrorMessageNotEmpty(wrapper)
  })
  it('should validate that title is not empty', () => {
    const wrapper = mountMui(
      <NewTaskForm onSave={noOp} onCancel={noOp} />)

    const titleInput = wrapper.find('.new-task-title input')
    assert.equal(titleInput.length, 1)

    titleInput.simulate('change', {target: {name: 'title', value: 'not empty'}})
    assertErrorMessageEmpty(wrapper)
    titleInput.simulate('change', {target: {name: 'title', value: ''}})
    assertErrorMessageNotEmpty(wrapper)
  })
  it('on save button click send task', () => {
    const saveSpy = sinon.spy()
    const wrapper = mountMui(
      <NewTaskForm onSave={saveSpy} onCancel={noOp} />)

    const titleInput = wrapper.find('.new-task-title input')
    const descriptionInput = wrapper.find('.new-task-description textarea[name="description"]')

    titleInput.simulate('change', {target: {name: 'title', value: 'New title'}})
    descriptionInput.simulate('change', {target: {name: 'description', value: 'New Description'}})

    const saveButton = wrapper.find('.new-task-form-actions .save-button button')
    saveButton.simulate('click')
    assert(saveSpy.calledOnce)
    assert.deepEqual(saveSpy.args[0], [{title: 'New title', description: 'New Description'}])
  })
  it('on cancel button click call handleCancel', () => {
    const cancelSpy = sinon.spy()
    const wrapper = mountMui(
      <NewTaskForm onSave={noOp} onCancel={cancelSpy} />)

    const cancelButton = wrapper.find('.new-task-form-actions .cancel-button button')
    cancelButton.simulate('click')
    assert(cancelSpy.calledOnce)
  })
})
