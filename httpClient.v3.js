const url = require('url');
const net = require('net');
const Request = require('./Request');
const Response = require('./Response');

const httpClient = {};

httpClient.get = function(urlString, callback) {
  let requestUrl = url.parse(urlString);
  let { hostname, port } = requestUrl;

  let req = new Request();
  req.method = 'GET';
  req.URI = '/';
  req.version = 'HTTP/1.1';
  req.header.Host = requestUrl.host;
  req.header.Connection = 'close';

  let client = new net.Socket();

  client.connect(port, hostname, function() {
    client.write(req.serialize());
  });

  client.on('data', function(data) {
    console.log(data.toString());
    let res = Response.deserialize(data.toString());

    client.destroy();
    callback(res);
  });
};

// ------------------- example -------------------
// httpClient.get('http://127.0.0.1:9000', function(res) {
//   console.log(res);
// });

module.exports = httpClient;
