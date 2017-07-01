const mongoose = require('mongoose');
let SessionSchema = new mongoose.Schema({
	ssid: mongoose.Schema.Types.ObjectId,
	userId: String,
	date_created: Date,
	date_renewed: {type: Date, default: Date.now},
	platform: String
});

module.exports = SessionSchema;