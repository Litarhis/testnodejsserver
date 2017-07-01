const mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
	fullname: {type: String, trim: true, unique: true},
	username: {type: String, trim: true, unique: true},
	password: {type: String, trim: true},
	email: {type: String, trim: true, unique: true},
	date_created: {type: Date, default: Date.now},
	score: Number,
	quests_taken: [{
		quest_id: {type: String, trim: true},
		date_taken: Date,
		completed: Boolean
	}]
});

UserSchema.index({"_id": 1});

module.exports = UserSchema;
//# sourceMappingURL=UserSchema.js.map