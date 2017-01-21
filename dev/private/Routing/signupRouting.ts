/**
 * signup routing
 * parsing form with POST method to insert new User in db
 */


module.exports = {
  link: function signupRouting(app: Object) {
    const crypto = require('crypto');
    const path = require('path');
    const formidable = require('formidable');

    // Database Schema
    const User = require('./../db/Models/UserModel');

    app.route('/signup')
    // send signup html
    .get((req, res) => {
      res.sendFile(path.join(__dirname, "../../public/views", "signup.view.html"));
    })
    .post((req, res) => {
      // parse signup form on post
      let form = new formidable.IncomingForm();

      // if form exists
      if(form) {
        form.parse(req, (err, fields, files) => {
          try{
            // error in parsing
            if(err) {
              throw err;
            }
            // checking if form is the right one
            if(!(fields.email && fields.username && fields.pass && fields.passRe)){
              throw new Error("Wrong form has been sent");
            }
          } catch(e) {
            console.log("Error occured while parsing form from POST method on SIGNUP page: " + e.message);
          }
          // check pass and retyped pass for matching
          if(fields.pass === fields.passRe) {
            // hash pass
            const hash = crypto.createHash('sha256');
            hash.update(fields.pass);
            // save new user in mongo
            (new User({
              "email": fields.email,
              "username": fields.username,
              "password": hash.digest('hex')
            })).save();

            res.redirect('/');
          } else {
            // user should be notified in this case
            console.log("password and retyped password DO NOT MATCH => USER should be notified in this case");
            res.redirect('/signup');
          }
          // redir to home
        });
      }
    });
  }}
