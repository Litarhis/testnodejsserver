module.exports = (function () {
		const mongoose = require('mongoose');
		const config = require('./../config.json');
		console.log((new Date()) + " Connecting to MongoDB Server");
		mongoose.connect('mongodb://localhost:'+ config.db_port +'/' + config.db);
		let db = mongoose.connection;
		db.on('error', console.error.bind(console, (new Date()) + ' connection error:'));
		db.once('open', () => {
				console.log((new Date()) + " Connection with the database established on PORT: " + config.db_port);
				const server = require('./../server');
				server.start();
		});
}());
//# sourceMappingURL=DB.js.map