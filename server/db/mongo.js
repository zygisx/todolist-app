import {MongoClient, ObjectID} from 'mongodb'
import _ from 'lodash'

/**
 * Wraps Mongo db client.
 *  - Exposes crud opetations
 *  - Uses promises instead of callbaacks
 */
class MongoWrapper {

  connect (url) {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        throw err
      }
      this.db = db
      console.log('Connected to MongoDB!')
    })
  }

  insert (collectionName, json) {
    let collection = this.db.collection(collectionName)
    return new Promise((resolve, reject) => {
      collection.insert(json, {w: 1}, this._callback(resolve, reject))
    })
  }

  getAll (collectionName, sort = {}) {
    let collection = this.db.collection(collectionName)
    return new Promise((resolve, reject) => {
      collection.find().sort(sort).toArray(this._callback(resolve, reject))
    })
  }

  remove (collectionName, id) {
    let collection = this.db.collection(collectionName)
    return new Promise((resolve, reject) => {
      collection.remove({_id: new ObjectID(id)}, {w: 1}, this._callback(resolve, reject))
    })
  }

  update (collectionName, id, newJson) {
    let collection = this.db.collection(collectionName)
    return new Promise((resolve, reject) => {
      collection.update(
        {_id: new ObjectID(id)},
        {$set: newJson},
        {w: 1},
        this._callback(resolve, reject))
    })
  }

  _callback (resolve, reject) {
    return (err, result) => {
      if (err) {
        console.log('ERROR:', err)
        reject(err)
      }
      resolve(result)
    }
  }
}

export default new MongoWrapper()
