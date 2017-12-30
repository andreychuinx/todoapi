const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes')
const mongoose = require('mongoose')
const cors = require('cors')

const task = require('./routes/tasks');
const user = require('./routes/users');
const todo = require('./routes/todos');
const signup = require('./routes/signup');
const signin = require('./routes/signin');

require('dotenv').config()
mongoose.connection.openUri(process.env.DATABAS, { useMongoClient: true });
mongoose.Promise = global.Promise;
mongoose.connection.once('open', () => {
  console.log('mongoose connection success');
}).on('error', (error) => {
  console.log('connection error', error);
})

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/tasks', task);
app.use('/api/users', user);
app.use('/api/todos', todo);
app.use('/api/signup', signup);
app.use('/api/signin', signin);

// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// app.use(function (err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
