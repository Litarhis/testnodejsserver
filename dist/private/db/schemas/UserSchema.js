const mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
});
UserSchema.index({ "Id": 1 });
module.exports = UserSchema;
//# sourceMappingURL=UserSchema.js.map