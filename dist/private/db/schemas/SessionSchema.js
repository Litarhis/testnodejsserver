const mongoose = require('mongoose');
let SessionSchema = new mongoose.Schema({
	ssid: {type: String, unique: true},
	userId: {type: String, unique: true},
	date_created: {type: Date, default: Date.now},
	expir: Date,
	platform: String
});

SessionSchema.index({"_id": 1});

module.exports = SessionSchema;