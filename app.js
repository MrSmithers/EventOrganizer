var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var http = require('http');
var url = require('url');

// Mongo Database.
var db_user = 'thsm1';
var db_password = 'fLSxJQlNA4fstgiw';

var db_url = `mongodb+srv://${db_user}:${db_password}@cluster0-pbyb5.mongodb.net/test`;
var db = null;

// Routes files.
var index = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');
var userLogin = require('./routes/userLogin');
var register = require('./routes/register');

// Express magic!
var app = express();

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

// The actual routes.
app.use('/', index);
app.use('/users', users);
app.use('/events', events);
app.use('/login', userLogin);
app.use('/sign-up', register);

// catch 404 and forward to error handler for error handling.
app.use(function(req, res, next) {
    var err = new Error('Not Found');
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

app.listen(3000, () => console.log('Express app listening on port 3000'))

// function mongoFind(collection, params = {}) {
//     return db.collection(collection).find(params);
// }