module.exports = {
    link: function signupRouting(app) {
        const crypto = require('crypto');
        const path = require('path');
        const formidable = require('formidable');
        const User = require('./../db/Models/UserModel');
        app.route('/signup')
            .get((req, res) => {
            res.sendFile(path.join(__dirname, "../../public/views", "signup.view.html"));
        })
            .post((req, res) => {
            let form = new formidable.IncomingForm();
            if (form) {
                form.parse(req, (err, fields, files) => {
                    try {
                        if (err) {
                            throw err;
                        }
                        if (!(fields.email && fields.username && fields.pass && fields.passRe)) {
                            throw new Error("Wrong form has been sent");
                        }
                    }
                    catch (e) {
                        console.log("Error occured while parsing form from POST method on SIGNUP page: " + e.message);
                    }
                    if (fields.pass === fields.passRe) {
                        const hash = crypto.createHash('sha256');
                        hash.update(fields.pass);
                        (new User({
                            "email": fields.email,
                            "username": fields.username,
                            "password": hash.digest('hex')
                        })).save();
                        res.redirect('/');
                    }
                    else {
                        console.log("password and retyped password DO NOT MATCH => USER should be notified in this case");
                        res.redirect('/signup');
                    }
                });
            }
        });
    }
};
//# sourceMappingURL=signupRouting.js.map