module.exports = { start: function() {
  const http = require('http');
  const  router = require('./router/Router');
  const  fs = require('fs');

  http.createServer((request, response) => {
    fs.readFile('./' + router[request.url], function(err, html) {
      if(err){
        response.writeHead(404);
        response.write('Bad request');
      }else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
      }
      response.end();
    });

  }).listen(4444);
}};
