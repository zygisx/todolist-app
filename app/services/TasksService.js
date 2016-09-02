
const tasks = [
  {id: 1, title: "Important task", description: "Lorem ipsum dolor sit amet, nec ei possim audiam epicurei. Sea ut verterem iudicabit, his cibo veri ut, eam ex semper accusam ponderum. Cum ne ludus nihil melius. Ad labitur discere pri, suas ludus te sea.", isDone: false},
  {id: 2, title: "Do loundry", description: "Lorem ipsum dolor sit amet, nec ei possim audiam epicurei. Sea ut verterem iudicabit, his cibo veri ut, eam ex semper accusam ponderum. Cum ne ludus nihil melius. Ad labitur discere pri, suas ludus te sea.", isDone: true},
  {id: 3, title: "Code something great", description: "Lorem ipsum dolor sit amet, nec ei possim audiam epicurei. Sea ut verterem iudicabit, his cibo veri ut, eam ex semper accusam ponderum. Cum ne ludus nihil melius. Ad labitur discere pri, suas ludus te sea.", isDone: false},
]

const byIdPredicate = id => (t) => t.id === id

class TasksService {

  all() {
    return new Promise(
      resolve => resolve(tasks))
  }

  create(task) {
    return new Promise(
      resolve => {
        const tNew = _.assign({id: Math.floor((Math.random()*100) + 1), isDone: false}, task)
        console.log(tNew)
        tasks.push(tNew)
        resolve(task)
      }
    )
  }

  delete(id) {
    return new Promise(
      resolve => {
        _.remove(tasks, t => t.id === id)
        resolve()
      }
    )
  }

  update(task) {
    return new Promise(
      resolve => {
        _.remove(tasks, t => t.id === task.id)
        tasks.push(task)
        console.log(task)
        resolve(task)
      }
    )
  }
}

module.exports = new TasksService();
