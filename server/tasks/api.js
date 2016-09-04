
/**
 * Tasks REST endpoints
 */
import TasksService from '~/tasks/service'
import {onError} from '~/utils/endpoints'

export function all(req, res) {
  TasksService.all()
    .then(
      (tasks) => res.send(tasks),
      onError(res));
}

export function create(req, res) {
  const task = req.body
  TasksService.insert(task)
    .then(
      () => res.send(task),
      onError(res))
}

export function update(req, res) {
  const id = req.params.id
  const task = req.body
  TasksService.update(id, task)
    .then(
      () => res.send(),
      onError(res))
}


export function remove(req, res) {
  const id = req.params.id
  TasksService.remove(id)
    .then(
      () => res.send(),
      onError(res))
}
