const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes')

const task = require('./routes/tasks');
const user = require('./routes/users');
const signup = require('./routes/signup');
const signin = require('./routes/signin');

require('dotenv').config()
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/task', task);
app.use('/api/user', user);
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