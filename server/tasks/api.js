
/**
 * Tasks REST endpoints
 */
import TasksService from '~/tasks/service'
import {onError} from '~/utils/endpoints'

export function all (req, res) {
  TasksService.all()
    .then(
      (tasks) => res.send(tasks),
      onError(res))
}

export function create (req, res) {
  const task = req.body
  if (handleValidation(task, res)) return
  TasksService.insert(task)
    .then(
      () => res.status(201).send(task),
      onError(res))
}

export function update (req, res) {
  const id = req.params.id
  const task = req.body
  if (handleValidation(task, res)) return
  TasksService.update(id, task)
    .then(
      () => res.send(),
      onError(res))
}

export function remove (req, res) {
  const id = req.params.id
  TasksService.remove(id)
    .then(
      () => res.send(),
      onError(res))
}

const handleValidation = (task, res) => {
  const errorResp = validationError(task)
  if (errorResp) {
    res.status(400).send(errorResp)
    return true
  } else {
    return false
  }
}

const error = (msg) => ({ message: msg })

const validationError = (task) => {
  const titleLength = task.title || task.title.length
  if (!titleLength || titleLength === 0) {
    return error('Title field is required')
  } else if (titleLength > 20) {
    return error('Title field cannot be longer then 20 symbols')
  }
  return false
}
