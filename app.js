const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const Database = require('./databaseUtils/dbConfig');
const cors = require('cors');
const Post = require('./models/post');



var app = express();
const blogRouter = require('./routes/blog');

/**
 *  Database initiate:
 */

const BlogDatabase = new Database();
BlogDatabase.start();


/**
 *  express configuration and middleware:
 */
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', blogRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.sendStatus(404);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(res.locals.message);
  res.json({error: 'some error occured'})
});

module.exports = app;
