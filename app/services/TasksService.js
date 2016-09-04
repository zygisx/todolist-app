
import HttpConnector from 'services/HttpConnector'

const URL = '/api/tasks'

const toJson = resp => resp.json()

class TasksService {

  all() {
    return HttpConnector.get(URL).then(toJson)
  }

  create(task) {
    return HttpConnector.post(URL, task).then(toJson)
  }

  delete(id) {
    return HttpConnector.delete(`${URL}/${id}`)
  }

  update(task) {
    return HttpConnector.put(`${URL}/${task._id}`, task)
  }
}

module.exports = new TasksService();
