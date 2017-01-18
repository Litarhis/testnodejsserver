module.exports = (function () {
    const mongoose = require('mongoose');
    const Contact = require('./models/ContactsModel');
    const createUser = require('./models/createUserModel');
    mongoose.connect('mongodb://localhost:27017/learn');
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.on('createUser', (email, username, password) => {
        (new createUser({
            "email": email,
            "username": username,
            "password": password
        })).save();
    });
    return db;
}());
//# sourceMappingURL=DB.js.map