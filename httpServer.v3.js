const net = require('net');
const Request = require('./Request');
const Response = require('./Response');

const httpServer = {};
let server = null;

httpServer.create = function(callback) {
  server = net.createServer((socket) => {

    socket.on('data', (data) => {
      let req = Request.deserialize(data.toString());
      let res = new Response();
      res.send = function () {
        socket.write(res.serialize());
      }

      callback(req, res);
    });
  });

  return server;
};

httpServer.listen = function(port, host) {
  if (server === null) {
    throw new Error('httpServer is not create.');
  }

  server.listen(port, host);
}

// -------------------- example --------------------
let testServer = httpServer.create((req, res) => {
  res.version = 'HTTP/1.1';
  res.statusCode = 200;
  res.reasonPhrase = 'Ok';
  res.header.Date = new Date();
  res.body = 'Hello World!';

  res.send();

  console.log(req);
  console.log('-------------');
  console.log(res);
});

testServer.listen(9000, '127.0.0.1');

module.exports = httpServer;
