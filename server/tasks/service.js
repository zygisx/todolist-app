import _ from 'lodash'

import MongoWrapper from '~/db/mongo'

const COLLECTION = 'tasks'

class TasksService {

  all () {
    return MongoWrapper.getAll(COLLECTION)
  }

  insert (task) {
    const newTask = _.assign({isDone: false, createdAt: new Date()}, task)
    return MongoWrapper.insert(COLLECTION, newTask)
  }

  update (id, task) {
    return MongoWrapper.update(COLLECTION, id, task)
  }

  remove (id) {
    return MongoWrapper.remove(COLLECTION, id)
  }
}

export default new TasksService()
