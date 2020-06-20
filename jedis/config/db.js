const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jedi', { useNewUrlParser: true });

module.exports = mongoose;
