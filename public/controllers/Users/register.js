const mongodb = require('../../models/mongo');
const bcrypt = require('bcrypt');

let promises = [];

exports.register = function (data, next) {
    let users = mongodb.get().collection('users');

    let user = {
        email: data.email,
        name: data.name
    }

    users.findOne({Email: data.email}, (err, document) => {
        if (document) {
            const err = [ {
                location: 'body',
                param: 'email',
                msg: 'That email already exists.'
            } ];

            next(err);
        }

        // Email is free.
        bcrypt.hash(data.password, 12, (err, hashed) => {
            if (err) {
                const err = [ {
                    location: 'body',
                    param: 'password',
                    msg: 'Something went wrong. Try again.'
                } ];

                next(err);
            }

            user.hash = hashed;

            users.insertOne(user, (err) => {
                if (err) {
                    const err = new Error('Not Found');
                    err.status = 404;
                    next(err);
                } else {
                    next(null, user);
                }
            });
        });
    });
};