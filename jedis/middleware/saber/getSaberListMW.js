/**
 * Load all sabertype from the database
 */
 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {

     const SaberModel = requireOption(objectrepository, 'SaberModel');

   return function(req, res, next) {
       SaberModel.find({}, (err, allsaber) => {
           if (err) {
               return next(err);
           }

           res.locals.allsaber = allsaber;
           return next();
       });
   };

 };
