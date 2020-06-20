const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Saber = db.model('Saber', {
    color: String,
    handler: String
});

module.exports = Saber;
