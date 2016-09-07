import request from 'supertest'
import sinon from 'sinon'
import {assert} from 'chai'

import app from './../../server/server'
import MongoWrapper from './../../server/db/mongo'
import {promise} from './test_utils'

/*
 * Tests for tasks api.
 * Tests calls real REST API methods using `sepertest` lib.
 * Only mocked part is mongo DB. Its wrapper `MongoWrapper` is mocked using `sinon`
 */

/* global describe it afterEach*/
describe('TasksApi', () => {
  describe('get all tasks endpoint', () => {
    it('should return tasks', (done) => {
      const getAll = sinon.stub(MongoWrapper, 'getAll')
      const expected = [{_id: '1', title: 'First'}, {_id: '1', title: 'First'}]
      getAll.returns(promise(expected))
      request(app)
        .get('/api/tasks')
        .expect(200)
        .expect((res) => {
          assert(getAll.calledOnce)
          assert.deepEqual(res.body, expected)
        })
        .end((err, res) => {
          if (err) throw err
          done()
        })
    })

    it('should pass sorting to mogo db', (done) => {
      const getAll = sinon.mock(MongoWrapper).expects('getAll')
        .withExactArgs(sinon.match.any, { createdAt: -1 })
        .once()
      getAll.returns(promise({}))
      request(app)
        .get('/api/tasks')
        .end(() => {
          getAll.verify()
          done()
        })
    })
    afterEach(() => {
      MongoWrapper.getAll.restore()
    })
  })

  describe('create task endpoint', () => {
    it('should append task properties', (done) => {
      const expected = {title: 'Task', description: 'Description'}
      const insert = sinon.mock(MongoWrapper).expects('insert')
        .once()
        .withExactArgs(
          sinon.match.any,
          sinon.match.object
            .and(sinon.match.hasOwn('isDone', false))
            .and(sinon.match.hasOwn('createdAt', sinon.match.date)))
      insert.returns(promise(expected))
      request(app)
        .post('/api/tasks')
        .send(expected)
        .end(() => {
          insert.verify()
          done()
        })
    })

    it('returns inserted object', (done) => {
      const expected = {title: 'Task', description: 'Description', isDone: false, createdAt: new Date()}

      const insert = sinon.stub(MongoWrapper, 'insert')
      insert.returns(promise(expected))
      request(app)
        .post('/api/tasks')
        .send(expected)
        .expect(201)
        .expect((res) => {
          assert(insert.calledOnce)
          assert.deepEqual(res.body, expected)
        })
        .end(() => done())
    })

    const titleValidationTest = (testName, title) => {
      it(testName, (done) => {
        const expected = {title: title, description: 'Description'}

        const insert = sinon.stub(MongoWrapper, 'insert')
        insert.returns(promise(expected))
        request(app).post('/api/tasks').send(expected)
          .expect(400)
          .expect((res) => {
            assert.isDefined(res.messaage, 'Error should have message defined')
          })
          .end(() => done())
      })
    }
    titleValidationTest('validates that task title present', '')
    titleValidationTest('validates that task title no longer then 20 char long', 'This text has 21 char')
    afterEach(() => {
      MongoWrapper.insert.restore()
    })
  })
  describe('update task endpoint', () => {
    it('should send to database only mutable properties', (done) => {
      const expected = {title: 'Task', description: 'Description', isDone: true}
      const update = sinon.mock(MongoWrapper).expects('update')
        .once()
        .withExactArgs(
          sinon.match.any,
          '12',
          sinon.match.object.and(sinon.match.hasOwn('isDone', true)))
      update.returns(promise(expected))
      request(app)
        .put('/api/tasks/12')
        .send(expected)
        .expect(200)
        .end(() => {
          update.verify()
          done()
        })
    })

    // duplicated tests from insert
    const titleValidationTest = (testName, title) => {
      it(testName, (done) => {
        const expected = {title: title, isDone: true}
        const update = sinon.stub(MongoWrapper, 'update')
        update.returns(promise(expected))
        request(app).put('/api/tasks/1').send(expected)
          .expect(400)
          .expect((res) => {
            assert.isDefined(res.messaage, 'Error should have message defined')
          })
          .end(() => done())
      })
    }
    titleValidationTest('validates that task title present', '')
    titleValidationTest('validates that task title no longer then 20 char long', 'This text has 21 char')
    afterEach(() => {
      MongoWrapper.update.restore()
    })
  })
  describe('delete task endpoint', () => {
    it('should delete item by id from uri', (done) => {
      const remove = sinon.mock(MongoWrapper).expects('remove')
        .once()
        .withExactArgs(sinon.match.any, '16')
      remove.returns(promise({}))
      request(app)
        .delete('/api/tasks/16')
        .expect(200)
        .end(() => {
          remove.verify()
          done()
        })
    })
    afterEach(() => {
      MongoWrapper.remove.restore()
    })
  })
})
