const mongoose = require('mongoose');
module.exports = Quest = mongoose.model("quests", require("./../schemas/QuestSchema"));