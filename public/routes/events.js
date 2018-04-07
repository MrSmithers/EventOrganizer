const express = require('express');
const router = express.Router();
const { body, params, validationResult } = require('express-validator/check');
const listing = require('../controllers/Events/listing');
const landing = require('../controllers/Events/landing');
const create = require('../controllers/Events/create');
const edit = require('../controllers/Events/edit');
const del = require('../controllers/Events/delete');

router.get('/', [
    // Validate user cookie.
], (req, res, next) => {
    if (!req.cookies.session) {
        // If user not logged in...
        res.redirect('/login?redirect=events');
    }

    listing.getListing((err, documents) => {
        if (err) next(err);
        res.render('Events/Listing', {
            module: 'Events',
            file: 'Listing',
            title: 'Events Listing',
            cookie: req.cookies.session,
            events: documents
        });
    });
});

router.get('/view/:eventId', [
    // Validate user cookie.
    // Validate get params.
], (req, res, next) => {
    if (!req.cookies.session) {
        // If user not logged in...
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

    landing.getEvent(req.params.eventId, (err, document) => {
        if (err) next(err);

        res.render('Events/Landing', {
            module: 'Events',
            file: 'Landing',
            title: 'Event Landing',
            cookie: req.cookies.session,
            event: document
        });
    });
});

router.get('/create', (req, res, next) => {
    if (!req.cookies.session) {
        // If user not logged in...
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

    res.render('Events/Create', {
        module: 'Events',
        file: 'Create',
        title: 'Event Create',
        cookie: req.cookies.session,
    });

});

router.post('/create', [
    // Validate user cookie.
    // Validate post params.
    // Validate userId in post params is the same as cookie.
], (req, res, next) => {
    if (!req.cookies.session) {
        // If user not logged in...
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

    create.insertEvent(req.body, (err, id) => {
        if (err)
        {
            res.render('Events/Create', {
                title: 'Event Create',
                body: req.body,
                success: err,
                cookie: req.cookies.session,
            });
        }
        else
        {
            res.redirect('/events/view/'+id);
        }

    });

});

router.get('/edit/:eventId', (req, res, next) => {
    if (!req.cookies.session) {
        // If user not logged in...
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

    edit.getEvent(req.params.eventId, (err, document) => {
        if (err || document === null) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        } else {
            res.render('Events/Edit', {
                title: 'Event Edit',
                body: req.body,
                success: err,
                cookie: req.cookies.session,
                event: document
            });
        }
    });
});

router.post('/edit/:eventId', [
    // Validate user cookie.
    // Validate post params.
    // Validate userId in post params is the same as cookie.
], (req, res, next) => {
    edit.updateEvent(req.params.eventId, req.body, (err) => {
        if (err)
        {
            next(err);
        }
        else
        {
            res.redirect('/events/view/'+req.params.eventId);
        }
    });
});

router.get('/delete/:eventId', (req, res, next) => {
    if (!req.cookies.session) {
        // If user not logged in...
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

    del.getEvent(req.params.eventId, (err, document) => {
       if (err || document === null) {
           const err = new Error('Not Found');
           err.status = 404;
           next(err);
       } else {
           res.render('Events/Delete', {
               module: 'Events',
               file: 'Delete',
               title: 'Event Delete',
               cookie: req.cookies.session,
               event: document
           });
       }
    });
});

router.get('/delete/:eventId/confirm', (req, res, next) => {
    if (!req.cookies.session) {
        // If user not logged in...
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

    del.deleteEvent(req.params.eventId, (err) => {
        if (err) {
            next(err);
        } else {
            res.redirect('/events');
        }
    })
});

module.exports = router;
