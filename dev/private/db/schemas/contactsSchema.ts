const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  "Id": Number,
  "Name": String,
  "Surname": String,
  "Tel": Number
});

schema.index({"Id": 1});

module.exports = schema;
