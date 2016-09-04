
import HttpConnector from 'services/HttpConnector'


const byIdPredicate = id => (t) => t.id === id // use it!!!
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
    return HttpConnector.put(`${URL}/${task.id}`, task)
  }
}

module.exports = new TasksService();
