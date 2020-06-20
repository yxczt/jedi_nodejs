/**
 * Using POST params saves a jedi to the database
 * Redirects to /jedi after success
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

    const SaberModel = requireOption(objectrepository, 'SaberModel');
    const JediModel = requireOption(objectrepository, 'JediModel');
  return function(req, res, next) {
        if (
            typeof req.body.name === 'undefined' ||
            typeof req.body.species === 'undefined' ||
            typeof req.body.gender === 'undefined' ||
            typeof req.body.saber === 'undefined'||
            req.body.name === '' ||
            req.body.species === '' ||
            req.body.gender === '' ||
            req.body.saber === ''
        ) {
            return next();
        }

            res.locals.jedi = new JediModel();
        SaberModel.findOne({ color: req.body.saber.substring(0, req.body.saber.indexOf(',')),
                              handler: req.body.saber.substring(req.body.saber.indexOf(',') + 2, req.body.saber.length)},(err, saber) => {
            if (err || !saber) {
                return next(err);
            }

            res.locals.jedi._saber = saber._id;
            res.locals.jedi.name = req.body.name.trim();
            res.locals.jedi.species = req.body.species.trim();
            res.locals.jedi.gender = req.body.gender.trim();
            res.locals.jedi.save(err => {
                if (err) {
                    return next(err);
                }
                  return res.redirect('/jedi');
          });




        });
    };

};
