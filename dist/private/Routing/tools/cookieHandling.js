module.exports = function(res, additional_responses, fields, Session, config, login) {
  Session.findOne({"ssid": fields.qrssid}, "_id ssid userId expir platform", (err, session) => {
  if(err) {
    console.log((new Date) + " Unexpected Error with Sessions");

    let response = {
      error: true,
      sess_expired: false,
      sess_renewed: false,
      sess_error: true,
      bad_password: false,
      response_msg: "Unexpected Error"
    };

    for (var key in additional_responses) {
      response[key] = additional_responses[key];
    }
    res.json(response);
  } else {
    if(session) {
      if(fields.qrssid) {
        if(session.ssid != fields.qrssid) {
          console.log((new Date) + "Stolen Ssid for user " + session.userId);
          session.remove();

          let response = {
            error: true,
            sess_expired: false,
            sess_error: true,
            bad_password: false,
            response_msg: "Stolen ssid"
          };
          for (var key in additional_responses) {
            response[key] = additional_responses[key];
          }
          res.json(response);
        } else {
          if(session.expir.getTime() > Date.now()) {
            session.expir = new Date(Date.now() + config.cookies_time*1000);
            session.save();
            console.log((new Date) + " Renewing ssid for " + session.userId);

            let response = {
              error: false,
              sess_expired: false,
              sess_renewed: true,
              sess_error: false,
              bad_password: false,
              response_msg: "Renewed ssid"
            };
            for (var key in additional_responses) {
              response[key] = additional_responses[key];
            }
            res.json(response);
          } else {
            console.log((new Date) + " ssid expired for user " + session.userId);
            session.remove();

            let response = {
              error: true,
              sess_expired: true,
              sess_renewed: false,
              sess_error: false,
              bad_password: false,
              response_msg: "ssid expired"
            };
            for (var key in additional_responses) {
              response[key] = additional_responses[key];
            }
            res.json(response);
          }
        }
      }
    } else {
      if(login) {
        let theSsid = randomstring.generate(24);
        let newSession = new Session({
          ssid: theSsid,
          userId: session.userId,
          expir: new Date(Date.now() + config.cookies_time*1000),
          platform: fields.platform
        });

        newSession.save((err, newsess) => {
          if(!err){
            console.log((new Date) + " New Session:\n" + newsess);

            let response = {
              error: false,
              sess_expired: false,
              sess_renewed: false,
              sess_error: false,
              bad_password: false,
              response_msg: "New session successful",
              user_not_found:false,
              ssid: theSsid
            };
            for (var key in additional_responses) {
              response[key] = additional_responses[key];
            }
            res.json(response);
          } else {
            console.log((new Date) + " Error while inserting new session");

            let response = {
              error: true,
              sess_expired: false,
              sess_renewed: false,
              sess_error: true,
              bad_password: false,
              response_msg: "Error while inserting new session",
              user_not_found:false
            };
            for (var key in additional_responses) {
              response[key] = additional_responses[key];
            }
            res.json(response);
          }
        });
      } else {
        console.log((new Date) + " Session Expired");
        let response = {
          error: true,
          sess_expired: true,
          sess_renewed: false,
          sess_error: false,
          bad_password: false,
          response_msg: "ssid expired"
        };
        for (var key in additional_responses) {
          response[key] = additional_responses[key];
        }
        res.json(response);
      }
    
    }
  }
  });
}