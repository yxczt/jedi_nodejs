/**
 * Removes a sabertype from the database
 * Redirects to /saber after delete
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.saber === 'undefined') {
            return next();
        }
      

        res.locals.saber.remove(err => {
            if (err) {
                return next(err);
            }


            return res.redirect('/saber');
        });
    };
};
