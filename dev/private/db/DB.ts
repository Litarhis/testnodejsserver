// This is a test to see how Mongoose works!
// ***************************************
module.exports = (function() {
  const mongoose = require('mongoose');
  const Contact = require('./models/ContactsModel');

  mongoose.connect('mongodb://localhost:27017/learn');

  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!

    let mylwni = new Contact({
      "Name": "Nikos",
      "Surname": "Mylwnas",
      "Tel": 8319839289
    });
  });
}());
