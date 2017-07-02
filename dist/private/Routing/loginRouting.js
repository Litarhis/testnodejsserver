module.exports = {
    link: function LoginRouting(app) {
        const crypto = require('crypto');
        const path = require('path');

        const formidable = require('formidable');
				const randomstring = require("randomstring");

        const User = require('./../db/Models/UserModel');
				const Session = require('./../db/Models/SessionModel');

				const sessioning = require('./tools/cookieHandling');

				const config = require('./../config.json');


        app.route('/user/login')
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
                        console.log((new Date()) + "Error occured while parsing form from POST method on Login page: " + e.message);
                    }
                    const hash = crypto.createHash('sha256');
                    hash.update(fields.pass);
                    User.findOne({ "username": fields.username }, "username password", (err, user) => {
                        if (err) {
                            res.json({
															error: true,
															sess_expired: false,
															sess_renewed: false,
															sess_error: false,
															user_not_found: false,
															bad_password: false,
															response_msg: "Bad criteria on search"
                            });
                        }
                        else {
                            if (!user) {
																console.log((new Date()) + " user " + fields.username + " not found in database");
																res.json({
																	error: true,
																	sess_expired: false,
																	sess_renewed: false,
																	sess_error: false,
																	user_not_found: true,
																	bad_password: false,
																	response_msg: "User not found"
																});
                            }
                            else {
															if(user.password === hash.digest('hex')){
																//fields must have qrssid and platform
																if(fields.qrssid){
																	sessioning(res, {user_not_found: false}, fields, Session, config, true);
																} else {
																	let theSsid = randomstring.generate(24);
																	let newSession = new Session({
																		ssid: theSsid,
																		userId: user._id,
																		expir: new Date(Date.now() + config.cookies_time*1000),
																		platform: fields.platform
																	});

																	newSession.save((err, newsess) => {
																		if(!err){
																			console.log((new Date) + " New Session:\n" + newsess);
											
																			res.json({
																				error: false,
																				sess_expired: false,
																				sess_renewed: false,
																				sess_error: false,
																				bad_password: false,
																				response_msg: "New session successful",
																				user_not_found:false,
																				ssid: theSsid
																			});
																		} else {
																			console.log((new Date) + " Error while inserting new session");

																			res.json({
																				error: true,
																				sess_expired: false,
																				sess_renewed: false,
																				sess_error: true,
																				bad_password: false,
																				response_msg: "Error while inserting new session",
																				user_not_found:false
																			});
																		}
																	});
																}
																// TODO: add session													
															} else {
																console.log((new Date()) + " Failed connection due to wrong pass for: " + user.username);

																res.json({
																	error: true,
																	sess_expired: false,
																	sess_renewed: false,
																	sess_error: false,
																	user_not_found: false,
																	bad_password: true,
																	response_msg: "Bad password"
																});
															}
                            }
                        }
                    });
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
//# sourceMappingURL=loginRouting.js.map