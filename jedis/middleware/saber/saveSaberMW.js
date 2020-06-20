/**
 * Using POST params saves a sabertype to the database
 * Redirects to /saber after success
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
  const SaberModel = requireOption(objectrepository, 'SaberModel');
 return function(req, res, next) {
       if (
           typeof req.body.color === 'undefined' ||
           typeof req.body.handler === 'undefined'||
           req.body.color === '' ||
           req.body.handler === ''
       ) {
           return next();
       }
           res.locals.saber = new SaberModel();
       res.locals.saber.color = req.body.color.trim();
       res.locals.saber.handler = req.body.handler.trim();

       res.locals.saber.save(err => {
           if (err) {
               return next(err);
           }
           return res.redirect('/saber');
       });
   };

};
