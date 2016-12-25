// This is a test to see how Mongoose works!
// ***************************************
module.exports = (function() {
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost:27017/learn');

  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
    let dbSchema = new mongoose.Schema({
      "Id": Number,
      "Name": String,
      "Surname": String,
      "Tel": Number
    });
    dbSchema.index({"id": 1});

    let Contact = mongoose.model("Contacts", dbSchema);

    let mylwni = new Contact({"Name": "Nikos", "Surname": "Mylwnas", "Tel": 8319839289});
    mylwni.save(function(error, mylwni) {
      if(error) console.log(error);
      console.log(mylwni + " added");
    });
  });



}());
