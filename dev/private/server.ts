(function() {
  const http = require('http');


  const server = http.createServer((request, response) => {
    response.end("Ola kala!!!");
  });

  server.listen(8888);
}());
