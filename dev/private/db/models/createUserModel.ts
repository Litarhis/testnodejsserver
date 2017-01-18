const mongoose = require('mongoose');

module.exports = createUser = mongoose.model('users', require("./../schemas/createUserSchema"));
