// This is a test to see how Mongoose works!
// ***************************************
module.exports = (function() {
  const mongoose = require('mongoose');
  const createUser = require('./models/createUserModel');

  mongoose.connect('mongodb://localhost:27017/learn');

  let db = mongoose.connection;
  // error handling
  db.on('error', console.error.bind(console, 'connection error:'));

  /** Connection established message */
  db.once('open', () => {
    console.log("Connection with the database established");
  });

  // create user event
  db.on('createUser', (email: string, username: string, password: string) => {
    (new createUser({
      "email": email,
      "username": username,
      "password": password
    })).save();
  });

  // TODO: create event to find only one user in databases
  db.on('findUserOnlyOne', (email: string, username: string) => {

  });

  // exporting database EventEmmiter
  return db;
}());
