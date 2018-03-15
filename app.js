// Libraries.
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// const http = require('http');
const https = require('https');
const fs = require('fs');

// Parameter passed in when the server is initialized.
const mode = process.argv[2];

// Local includes.
const database = require('./config/database')(mode);
const config = require('./config/config')();
const mongodb = require('./public/models/mongo');

// Mongo Database.
mongodb.connect(function(err) {
    if (err) throw err;
    console.log(`Connected to ${mode || 'external'} MongoDB with collection ` +
    `${database.validate} as validation.`);
});

// Routes files.
const index = require('./public/routes/index');
const users = require('./public/routes/users');
const events = require('./public/routes/events');
const login = require('./public/routes/login');
const logout = require('./public/routes/logout');
const register = require('./public/routes/register');
const jsonapi = require('./public/routes/jsonapi');

// Express magic!
const app = express();

// View engine setup. Currently using Jade.
app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'jade');

// Set up Express.
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// The actual routes. These routes can have extensions and parameters following them
// which will be handled in the respective route file.
app.use('/', index);
app.use('/users', users);
app.use('/events', events);
app.use('/login', login);
app.use('/logout', logout);
app.use('/sign-up', register);
app.use('/api', jsonapi);

// If not one of the routes above, the page doesn't exit.
// Catch 404 and pass to the error handler using next() for error handling.
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// I am the error handler. I handle errors.
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

// Use a self-signed SSL certificate.
const options = {
    key: fs.readFileSync('/Users/Tom/Documents/webapps/EventOrganizer/server.key'),
    cert: fs.readFileSync('/Users/Tom/Documents/webapps/EventOrganizer/server.crt'),
    requestCert: false,
    rejectUnauthorized: false
};

https.createServer(options, app).listen(config.port, function(){
    console.log('Express app listening on port ' + config.port);
});