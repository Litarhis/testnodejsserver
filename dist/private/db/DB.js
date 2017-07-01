module.exports = (function () {
		const mongoose = require('mongoose');
		console.log((new Date()) + " Connecting to MongoDB Server");
		mongoose.connect('mongodb://localhost:27017/qr_quest');
		let db = mongoose.connection;
		db.on('error', console.error.bind(console, (new Date()) + ' connection error:'));
		db.once('open', () => {
				console.log((new Date()) + " Connection with the database established on PORT: " + 27017);
				const server = require('./../server');
				server.start();
		});
}());
//# sourceMappingURL=DB.js.map