const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(204);
  res.end();
});

server.listen(9000, '127.0.0.1');
