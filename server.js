'use strict';

/*
 * nodejs-express-mongoose-demo
 * Copyright(c) 2013 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */

require('dotenv').config();


var fs = require('fs');
var http = require('http');
var https = require('https');

const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config');

const models = join(__dirname, 'app/models');
const port = process.env.PORT || 3000;
const app = express();

/**
 * Expose
 */

module.exports = app;

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

// Bootstrap routes
require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen () {
  if (app.get('env') === 'test') return;

  // var debug = true;
  var debug = false;

  if (debug) {
      app.listen(port);
      console.log('Express app started on port ' + port);
  } else {
      var privateKey  = fs.readFileSync('/root/.cert/1523182031415.key', 'utf8'),
          certificate = fs.readFileSync('/root/.cert/1523182031415.pem', 'utf8');
      var credentials = {key: privateKey, cert: certificate};

      var httpServer = http.createServer(app);
      var httpsServer = https.createServer(credentials, app);
      var PORT = 80;
      var SSLPORT = 443;

      httpServer.listen(PORT, function() {
          console.log('HTTP Server is running on: http://localhost:%s', PORT);
      });

      httpsServer.listen(SSLPORT, function() {
          console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
      });
  }

}

function connect () {
  // var options = { server: { socketOptions: { keepAlive: 1 } } };
  // return mongoose.connect(config.db, options).connection;
    return mongoose.connect('mongodb://localhost:27017/xiaoshuo').connection;
}



/*

var express = require('express');
var path = require('path');

var fs = require('fs');
var http = require('http');
var https = require('https');
privateKey  = fs.readFileSync('./cert/1523182031415.key', 'utf8'),
certificate = fs.readFileSync('./cert/1523182031415.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var app = express();

app.use(express.static(path.join(__dirname, 'index')));

httpServer = http.createServer(app);
httpsServer = https.createServer(credentials, app);
var PORT = 80;
var SSLPORT = 443;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});

httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

 */
