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
const sass = require('node-sass-middleware');

// Parameter passed in when the server is initialized.
const mode = process.argv[2];

// Local includes.
const database = require('./config/database')(mode);
const config = require('./config/config')();
const mongodb = require('./models/mongo');

// Mongo Database.
mongodb.connect(function(err) {
    if (err) throw err;
    console.log(`Connected to ${mode || 'external'} MongoDB with collection ` +
    `${database.validate} as validation.`);
});

// Routes files.
const index = require('./routes/index');
const users = require('./routes/users');
const events = require('./routes/events');
const login = require('./routes/login');
const register = require('./routes/register');

// Express magic!
const app = express();

// View engine setup. Currently using Jade.
app.set('views', path.join(__dirname, 'views'));
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
app.use('/sign-up', register);

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

// http.createServer(function (req, res) {
//     app.get('/', function (req, res) {
//         res.send('GET request to the homepage')
//     })
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//
//     MongoClient.connect(db_url, function(err, client) {
//         if (err) throw err;
//         res.write('Database connection success!\n');
//
//         db = client.db("cluster0");
//         res.write('Connected to cluster.\n');
//
//         mongoFind('users').toArray(function(err, result) {
//             if (err) throw err;
//             console.log(result+'\n');
//             client.close();
//             res.end();
//         });
//     });
//
// }).listen(8080);

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