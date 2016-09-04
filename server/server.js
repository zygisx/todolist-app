import express from 'express'
import bodyParser from 'body-parser'
import Storage from '~/storage'

const app = express();

app.use(bodyParser.json())
app.use(express.static('build'));

app.get('/api/tasks', function (req, res) {
  const tasks = Storage.all();
  res.send(tasks);
});

app.post('/api/tasks', function (req, res) {
  console.log(req.body);
  const task = Storage.insert(req.body);
  res.send(task);
});

app.delete('/api/tasks/:id', function (req, res) {
  console.log(req.params.id)
  Storage.delete(parseInt(req.params.id));
  res.send();
});

app.put('/api/tasks/:id', function (req, res) {
  Storage.update(req.body);
  res.send();
});


app.listen(8080, function () {
  console.log('Example app listening on port 3000!');
});
