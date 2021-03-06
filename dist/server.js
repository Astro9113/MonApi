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
var join = require('path').join;
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config');

var models = join(__dirname, 'app/models');
var port = process.env.PORT || 3000;
var app = express();

/**
 * Expose
 */

module.exports = app;

// Bootstrap models
fs.readdirSync(models).filter(function (file) {
  return ~file.search(/^[^\.].*\.js$/);
}).forEach(function (file) {
  return require(join(models, file));
});

// Bootstrap routes
require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);

connect().on('error', console.log).on('disconnected', connect).once('open', listen);

function listen() {
  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log('Express app started on port ' + port);
}

function connect() {
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
//# sourceMappingURL=server.js.map