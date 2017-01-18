module.exports = {
  start: function(database) {
    const path = require('path');
    const formidable = require('formidable');
    const express = require('express');
    const hash = require('crypto').createHash('sha256');
    const app = express();

    /** home */
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, "../public/views", "home.view.html"));
    });

    /** login routing */
    app.route('/login')
      .get((req, res) => {
        res.sendFile(path.join(__dirname, "../public/views", "login.view.html"));
      })
      .post((req, res) => {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
          hash.update(fields.pass);
          res.redirect('/');
        });
      });

    /**
     * signup routing
     * database variable used to emit createUser event 
     */
    app.route('/signup')
      .get((req, res) => {
        res.sendFile(path.join(__dirname, "../public/views", "signup.view.html"));
      })
      .post((req, res) => {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
          hash.update(fields.pass);
          database.emit('createUser', fields.email, fields.username, hash.digest('hex'));

          res.redirect('/');
        });
      });

    app.listen(4444);
  }
};
