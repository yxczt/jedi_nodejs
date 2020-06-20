/**
 * Load a sabertype from the database using the :saberID param
 */
const requireOption = require('../requireOption');



module.exports = function(objectrepository) {
const SaberModel = requireOption(objectrepository, 'SaberModel');

      return function(req, res, next) {
          SaberModel.findOne({ _id: req.params.saberID }, (err, saber) => {
              if (err || !saber) {
                  return next(err);
              }

              res.locals.saber = saber;
              return next();
          });
      };

};
