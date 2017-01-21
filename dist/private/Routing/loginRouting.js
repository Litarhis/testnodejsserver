module.exports = {
    link: function LoginRouting(app) {
        const crypto = require('crypto');
        const path = require('path');
        const formidable = require('formidable');
        const User = require('./../db/Models/UserModel');
        app.route('/login')
            .get((req, res) => {
            res.sendFile(path.join(__dirname, "../../public/views", "login.view.html"));
        })
            .post((req, res) => {
            let form = new formidable.IncomingForm();
            if (form) {
                form.parse(req, (err, fields, files) => {
                    try {
                        if (err) {
                            throw err;
                        }
                        if (!(fields.username && fields.pass)) {
                            throw new Error("Wrong form has been sent");
                        }
                    }
                    catch (e) {
                        console.log("Error occured while parsing form from POST method on SIGNUP page: " + e.message);
                    }
                    const hash = crypto.createHash('sha256');
                    hash.update(fields.pass);
                    User.findOne({ "username": fields.username }, "username password", (err, user) => {
                        if (err) {
                            res.send("Bad criteria on search");
                        }
                        else {
                            if (!user) {
                                res.send("User not found");
                            }
                            else {
                                res.send(user.password === hash.digest('hex'));
                            }
                        }
                    });
                });
            }
            else {
                console.log("password and retyped password DO NOT MATCH => USER should be notified in this case");
                res.redirect('/login');
            }
        });
    }
};
//# sourceMappingURL=loginRouting.js.map