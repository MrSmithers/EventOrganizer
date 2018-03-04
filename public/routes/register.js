const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongodb = require('../models/mongo');
const { body,validationResult } = require('express-validator/check');
const register = require('../controllers/Users/register');

router.get('/', function(req, res, next) {
    if (req.cookies.session) {
        console.log(req.cookies);
        // Already logged in.
        res.redirect('/');

        next();
    }

    res.render('Users/Register', {
        title: 'Register',
        module: 'Users',
        file: 'Register'
    });

    next();
});

router.post('/', (req, res, next) => {
    register.register(req.body, (err, document) => {
        if (err) {
            res.render('Users/Register', {
                title: 'Register',
                module: 'Users',
                file: 'Register',
                errors: err
            });
            next();
        } else {
            // Set the session cookie.
            res.cookie('session', {id: document._id});
            res.redirect('/');

            next();
        }
    });
});

module.exports = router;