const express = require('express');
const router = express.Router();
const profile = require('../controllers/Users/profile');

router.get('/profile/:userId', (req, res, next) => {
    profile.profile(req.params.userId, (err, document) => {
        if (err) next(err);
        res.render('Users/Profile', {
            title: document.name,
            module: 'Users',
            file: 'Profile',
            userId: document._id,
            cookie: req.cookies.session,
        });
    });
});

module.exports = router;
