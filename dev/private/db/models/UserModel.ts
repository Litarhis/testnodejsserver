const mongoose = require('mongoose');

module.exports = User = mongoose.model('users', require("./../schemas/UserSchema"));
