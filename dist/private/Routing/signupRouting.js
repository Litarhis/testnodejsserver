module.exports = {
    link: function signupRouting(app) {
        const mongoose = require('mongoose');
        const crypto = require('crypto');
        const path = require('path');
        const formidable = require('formidable');
        const User = require('./../db/models/UserModel');
        app.route('/user/register')
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
                        console.log((new Date()) + " Error occured while parsing form from POST method on SIGNUP page: " + e.message);
                    }
                    if (fields.pass === fields.passRe) {
                        const hash = crypto.createHash('sha256');
                        hash.update(fields.pass);
                        let newuser = new User({
                            "fullname": fields.fullname,
                            "username": fields.username,
                            "password": hash.digest('hex'),
                            "email": fields.email,
                            "score": 0,
                            "quests_taken": []
                        });
                        newuser.save((err, newuser) => {
                            if(err) {
                                console.log((new Date()) + " Error while inserting new User to database");

                                res.json({
                                    error: true,
                                    bad_pass_match: false,
                                    response_msg: "User could not be inserted to database"
                                });
                            } else {
                                console.log((new Date()) + " new User added to db:\n" + newuser);

                                res.json({
                                    error: false,
                                    response_msg: "Success"
                                });
                            }
                        });
                    }
                    else {
                        res.json({
                            error: true,
                            bad_pass_match: true,
                            response_msg: "password and retyped password do not match"
                        });
                    }
                });
            }
            else {
							console.log((new Date()) + " Expected form -> not sent");
                res.json({
                  error: true,
									response_msg: "Form not sent"
                });
            }
        });
    }
};
//# sourceMappingURL=signupRouting.js.map