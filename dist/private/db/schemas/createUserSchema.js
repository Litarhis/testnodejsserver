const mongoose = require('mongoose');
let createUserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
});
createUserSchema.index({ "Id": 1 });
module.exports = createUserSchema;
//# sourceMappingURL=createUserSchema.js.map