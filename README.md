## Todo-list app

Simple todo list application.
Functions:
  - Create tasks with brief title and description
  - Mark tasks done or redo tasks
  - Delete tasks
  - Basic filtering

Created using google material design components. UI inspired by google keep app.

### Usage

**Install all required dependencies**
```
$ npm install
```

**Start app in dev mode.**
```
$ npm start
```
This command will:
  - make `webpack` requild frontend on every change
  - restarts `nodejs` server on every server side change


**Start app in production mode**
```
$ npm run prod
```
This command will:
  - minifies all frontend code and put it in `build` folder
  - compiles server side code using babel and put in in `dist` folder
  - starts `nodejs` server

**Run tests**

Run all tests:
```
$ npm test
```
Run backend tests:
```
$ npm run server-tests
```
Run frontend tests:
```
$ npm run frontend-tests
```


### Architecture

Web page written in `reactjs` communicates with `expressjs` `node` backend server via REST api. Data stored in external mongodb database. Now as mongo db privided [mlab](https://mlab.com) was chosen. Mongo db url can be configured in `server/config.js` file. Application is deployed into [heroku](https://www.heroku.com/) cloud application platform

App url: https://zee-todo-app.herokuapp.com/ (first page load may take some time)

### Structure:
```
├── app               - frontend code
├── build             - webpack builded frontend static files. Created during build
├── dist              - server side builded code. Created during build
├── server            - server side code
├── tests             
    ├── backend       - backend tests
    └── frontend      - frontend tests; only few components are covered with unit tests
├── Procfile          - heroku instruction how to run app
├── package.json      - npm dependencies and scripts
└── webpack.config.js - webpack configuration a.k.a. frontend build configuration
```

### Tech stack

**Development tools:**

 - `Babel` - compiles es6 (es2015) code to es5. Confifuration in `.babelrc`
 - `eslint` - es6 and jsx linter. Used by atom. Not configured as part of build. Configuration in `.eslitrc`
 - `webpack` - build frontend code. Configuration stored in `webpack.config.js`. Notable webpack plugins:
   - `ExtractTextPlugin` - extracts css to sepatate file.
   - `CopyWebpackPlugin` - copies `index.html` into build catalog

**Frontend:**
 - `Reactjs` - UI framework
 - `material-ui` - material ui components for `reactjs`

**Backend:**
 - `expressjs` - server side framework to build rest api and serve static resources
 - `mongodb` - database of choice. Integration with mongo done using official node mongo db driver.

**Utils:**
 - `lodash` - great js utilities and functional stuff
 -  `whatwg-fetch` - github lib for making web requests and handle results as promises
 - `moment` - for date/time handling

**Tests:**
 - `mocha` - tests runner
 - `supertest` - HTTP assertions lib, for testing REST api
 - `sinon` - mocking dependencies
 - `chai` - assertion library
 - `enzyme` - ReactJs components testing library
