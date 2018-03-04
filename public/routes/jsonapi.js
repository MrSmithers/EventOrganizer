const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator/check');
const api = require('../controllers/Events/api');

router.get('/events.json', (req, res, next) => {
    api.getJsonListing((err, documents) => {
        if (err) next(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(documents));
    });
});

router.get('/events/:eventId.json', (req, res, next) => {
    api.getJsonEvent(req.params.eventId, (err, document) => {
        if (err) next(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(document));
    });
});

router.post('/events.json', [
    // Validate POST params
], (req, res, next) => {
    api.getJsonByParams(req.body, (err, documents) => {
        if (err) next(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(documents));
    });
});

module.exports = router;
