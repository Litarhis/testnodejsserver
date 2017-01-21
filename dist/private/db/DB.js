module.exports = (function () {
    const mongoose = require('mongoose');
    console.log("Connecting to MongoDB Server");
    mongoose.connect('mongodb://localhost:27017/learn');
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log("Connection with the database established on PORT: " + 27017);
        const server = require('./../server');
        server.start();
    });
}());
//# sourceMappingURL=DB.js.map