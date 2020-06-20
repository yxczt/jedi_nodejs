const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Jedi = db.model('Jedi', {
  _saber: {
      type: Schema.Types.ObjectId,
      ref: 'Saber'
  },
    name: String,
    species: String,
    gender: String

});

module.exports = Jedi;
