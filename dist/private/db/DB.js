module.exports = (function () {
    const mongoose = require('mongoose');
    const createUser = require('./models/createUserModel');
    mongoose.connect('mongodb://localhost:27017/learn');
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log("Connection with the database established");
    });
    db.on('createUser', (email, username, password) => {
        (new createUser({
            "email": email,
            "username": username,
            "password": password
        })).save();
    });
    db.on('findUserOnlyOne', (email, username) => {
    });
    return db;
}());
//# sourceMappingURL=DB.js.map