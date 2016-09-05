import express from 'express'
import bodyParser from 'body-parser'
import MongoWrapper from '~/db/mongo'

import * as TasksApi from '~/tasks/api'
import config from '~/config'

const app = express()
MongoWrapper.connect(config.db.url)

app.use(bodyParser.json())
app.use(express.static('build'))

// Routes:
app.get('/api/tasks', TasksApi.all)
app.post('/api/tasks', TasksApi.create)
app.put('/api/tasks/:id', TasksApi.update)
app.delete('/api/tasks/:id', TasksApi.remove)

const port = process.env.PORT || config.app.port
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
