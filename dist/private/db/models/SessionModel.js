const mongoose = require('mongoose');
module.exports = Session = mongoose.model('sessions', require("./../schemas/SessionSchema"));