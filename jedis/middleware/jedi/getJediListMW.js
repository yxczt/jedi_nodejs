/**
 * Load all jedi from the database
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

    const JediModel = requireOption(objectrepository, 'JediModel');

  return function(req, res, next) {
      JediModel.find({}, (err, alljedi) => {
          if (err) {
              return next(err);
          }

          res.locals.alljedi = alljedi;
          console.log(res.locals.alljedi);
          return next();
      });
  };

};
