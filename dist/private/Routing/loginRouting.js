module.exports = {
    link: function LoginRouting(app) {
        const crypto = require('crypto');
        const path = require('path');
        const formidable = require('formidable');
        const User = require('./../db/Models/UserModel');
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
                        console.log((new Date()) + "Error occured while parsing form from POST method on SIGNUP page: " + e.message);
                    }
                    const hash = crypto.createHash('sha256');
                    hash.update(fields.pass);
                    User.findOne({ "username": fields.username }, "username password", (err, user) => {
                        if (err) {
                            res.json({
															error: true,
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
																	user_not_found: true,
																	bad_password: false,
																	response_msg: "User not found"
																});
                            }
                            else {
															if(user.password === hash.digest('hex')){
																console.log((new Date()) + " New connection from: " + user.username);

																res.json({
																	error: false,
																	user_not_found: false,
																	bad_password: false,
																	response_msg: "Validation succeded"
																});
															} else {
																console.log((new Date()) + " Failed connection due to wrong pass for: " + user.username);

																res.json({
																	error: true,
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