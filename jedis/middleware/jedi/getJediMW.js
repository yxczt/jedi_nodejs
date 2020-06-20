/**
 * Load a jedi from the database using the :jediID param
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
const JediModel = requireOption(objectrepository, 'JediModel');

      return function(req, res, next) {
          JediModel.findOne({ _id: req.params.jediID }, (err, jedi) => {
              if (err || !jedi) {
                  return next(err);
              }

              res.locals.jedi = jedi;
              return next();
          });
      };
};
