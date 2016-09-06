import _ from 'lodash'

import MongoWrapper from '~/db/mongo'

const COLLECTION = 'tasks'

class TasksService {

  all () {
    return MongoWrapper.getAll(COLLECTION, {createdAt: -1})
  }

  insert (task) {
    const newTask = _.assign({isDone: false, createdAt: new Date()}, task)
    return MongoWrapper.insert(COLLECTION, newTask)
  }

  update (id, task) {
    const updatable = _.pick(task, ['isDone']) // pick only mutable properties
    return MongoWrapper.update(COLLECTION, id, updatable)
  }

  remove (id) {
    return MongoWrapper.remove(COLLECTION, id)
  }
}

export default new TasksService()
