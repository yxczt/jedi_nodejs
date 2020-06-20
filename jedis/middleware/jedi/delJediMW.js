/**
 * Removes a jedi from the database
 * Redirects to /jedi after delete
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.jedi === 'undefined') {
            return next();
        }

        res.locals.jedi.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/jedi');
        });
    };
};
