
import _ from 'lodash'; // to get lodash loaded


const tasks = [
  {id: 1, title: "Important task", description: "Lorem ipsum dolor sit amet, nec ei possim audiam epicurei. Sea ut verterem iudicabit, his cibo veri ut, eam ex semper accusam ponderum. Cum ne ludus nihil melius. Ad labitur discere pri, suas ludus te sea.", isDone: false},
  {id: 2, title: "Do loundry", description: "Lorem ipsum dolor sit amet, nec ei possim audiam epicurei. Sea ut verterem iudicabit, his cibo veri ut, eam ex semper accusam ponderum. Cum ne ludus nihil melius. Ad labitur discere pri, suas ludus te sea.", isDone: true},
  {id: 3, title: "Code something great", description: "Lorem ipsum dolor sit amet, nec ei possim audiam epicurei. Sea ut verterem iudicabit, his cibo veri ut, eam ex semper accusam ponderum. Cum ne ludus nihil melius. Ad labitur discere pri, suas ludus te sea.", isDone: false},
]

class Storage {

  constructor() {
    console.log("new storage")
  }

  all() {
    return tasks;
  }

  insert(task) {
    console.log(task);
    const tNew = _.assign({id: Math.floor((Math.random()*100) + 1), isDone: false}, task)
    tasks.push(tNew)
    console.log(tasks)
    return tNew
  }

  delete(id) {
    _.remove(tasks, t => t.id === id)
    console.log(tasks)
  }

  update(task) {
    _.remove(tasks, t => t.id === task.id)
    tasks.push(task)
  }

}


module.exports = new Storage();
