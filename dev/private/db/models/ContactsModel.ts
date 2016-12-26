const mongoose = require("mongoose");
const contactsSchema = require('./../schemas/contactsSchema');

module.exports =  Contact = mongoose.model("contacts", contactsSchema);
