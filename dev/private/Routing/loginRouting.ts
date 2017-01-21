/**
 * Implemetation of login routing
 */

/** login routing */
module.exports = {
  link: function LoginRouting(app: Object): void {
    const crypto = require('crypto');
    const path = require('path');
    const formidable = require('formidable');

    // Database Schema
    const User = require('./../db/Models/UserModel');

    app.route('/login')
    // sending login html
    .get((req, res) => {
      res.sendFile(path.join(__dirname, "../../public/views", "login.view.html"));
    })
    .post((req, res) => {
      // parse login form on post
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
            if(!(fields.username && fields.pass)){
              throw new Error("Wrong form has been sent");
            }
          } catch(e) {
            console.log("Error occured while parsing form from POST method on SIGNUP page: " + e.message);
          }
          // hash password
          const hash = crypto.createHash('sha256');
          hash.update(fields.pass);

          User.findOne({"username": fields.username}, "username password", (err, user) => {
            if(err) {
              res.send("Bad criteria on search");
            }else {
              if(!user) {
                res.send("User not found");
              }else {
                // send if typed and stored passwords match
                res.send(user.password === hash.digest('hex'));
              }
            }
          });
        });
      }else {
        console.log("password and retyped password DO NOT MATCH => USER should be notified in this case");
        res.redirect('/login');
      }

    });
  }
}
