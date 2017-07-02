module.exports = {
    link: function homeRouting(app) {
        const path = require('path');
				const formidable = require('formidable');
				const randomstring = require("randomstring");

				const Session = require('./../db/Models/SessionModel');

				const sessioning = require('./tools/cookieHandling');

				const config = require('./../config.json');

        app.route('/')
          .get((req, res) => {
						res.sendFile(path.join(__dirname, "../../public/views", "home.view.html"));
				})
					.post((req, res) => {
						let form = new formidable.IncomingForm();
            if (form) {
							form.parse(req, (err, fields, files) => {
								try {
									if (err) {
											throw err;
									}
								}
								catch (e) {
									console.log((new Date()) + "Error occured while parsing form from POST method on Home page: " + e.message);
								}

								if(fields.qrssid) {
									sessioning(res, {}, fields, Session, config, false);
								} else {
									res.json({
										error: true,
										response_msg: "Form is missing credentials"
									});
								}
							})
						} else {
							console.log((new Date()) + " Expected form -> not sent");
							res.json({
								error: true,
								response_msg: "Form not sent"
							});
						}
					});
    }
};
//# sourceMappingURL=homeRouting.js.map