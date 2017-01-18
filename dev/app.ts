// MAIN JS FIle
/* ------------- */

// CONNECT to MongoDB through Mongoose
const database = require('./private/db/DB');

//SERVER
const server = require('./private/server');

// Launching SERVER
server.start(database);

// Database Connection
