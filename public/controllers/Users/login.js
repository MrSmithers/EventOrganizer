const mongodb = require('../../models/mongo');
const bcrypt = require('bcrypt');

exports.login = function (data, next) {
    const email = data.email;
    const password = data.password;

    let users = mongodb.get().collection('users');

    users.findOne({email: email}, (err, document) => {
        if (document == null) {
            const err = [ {
                location: 'body',
                param: 'email',
                msg: 'Email does not exist.'
            } ];

            next(err);
        } else {
            // User found.
            bcrypt.compare(password, document.hash, (err, success) => {
                if (err) {
                    const err = [ {
                        location: 'body',
                        param: 'password',
                        msg: 'Password is incorrect.'
                    } ];

                    next(err);
                }

                if (success) {
                    // Return no error.
                    next(null, document);

                } else {
                    // Passwords don't match
                    const err = [ {
                        location: 'body',
                        param: 'password',
                        msg: 'Password is incorrect'
                    } ];
                    next(err);
                }
            });
        }
    });
};