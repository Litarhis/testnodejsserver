// This is a test to see how Mongoose works!
// ***************************************
module.exports = (function() {
  const mongoose = require('mongoose');

  console.log("Connecting to MongoDB Server")
  mongoose.connect('mongodb://localhost:27017/learn');

  let db = mongoose.connection;
  // error handling
  db.on('error', console.error.bind(console, 'connection error:'));

  /**
  * Connection established message
  * initializing and starting server
  */
  db.once('open', () => {
    console.log("Connection with the database established on PORT: " + 27017);

    // initialize SERVER
    const server = require('./../server');

    // starting server
    server.start();

  });
}());
