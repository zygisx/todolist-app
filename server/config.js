
const config = {}

config.db = {}
config.db.user = 'test'
config.db.password = 'test123'
config.db.url = `mongodb://${config.db.user}:${config.db.password}@ds019926.mlab.com:19926/zee-todo-app`

config.app = {}
config.app.port = 8080

export default config
