import express from 'express'
import bodyParser from 'body-parser'
import MongoWrapper from '~/db/mongo'

import * as TasksApi from '~/tasks/api'

const app = express()
MongoWrapper.connect('mongodb://localhost:27017/todo')

app.use(bodyParser.json())
app.use(express.static('build'))

// Routes:
app.get('/api/tasks', TasksApi.all)
app.post('/api/tasks', TasksApi.create)
app.put('/api/tasks/:id', TasksApi.update)
app.delete('/api/tasks/:id', TasksApi.remove)

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
