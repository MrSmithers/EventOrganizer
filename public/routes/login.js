const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator/check');
const login = require('../controllers/Users/login');

router.get('/', (req, res, next) => {
    const redirect = req.body.redirect || '';

    if (req.cookies.session) {
        // Already logged in, silly!
        if (redirect) {
            res.redirect(redirect);
        } else {
            res.redirect('/');
        }

        next();
    }

    res.render('Users/Login', {
        module: 'Users',
        file: 'Login',
        title: 'Login',
        redirect: redirect
    });
});

router.post('/', [
    body('password', 'Passwords must be at least 5 characters long.')
        .isLength({ min: 5 }),
    body('email', 'Email is not valid.')
        .isEmail()
], (req, res, next) => {
    const validate = validationResult(req);
    const redirect = req.body.redirect || '';

    if (!validate.isEmpty()) {
        res.render('Users/Login', {
            title: 'Login',
            redirect: redirect,
            errors: validate.array()
        });
        next();
    }

    login.login(req.body, (err, document) => {
        if (err) {
            res.render('Users/Login', {
                title: 'Login',
                redirect: redirect,
                errors: err
            });
            next();
        }

        // Set the session cookie.
        res.cookie('session', {id: document._id});

        if (redirect) {
            res.redirect(redirect);
        } else {
            res.redirect('/');
        }

        next();
    });
});

module.exports = router;
