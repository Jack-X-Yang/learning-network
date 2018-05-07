function Request () {
  this.method = undefined;
  this.URI = undefined;
  this.version = undefined;
  this.header = {};
  this.body = undefined;
}

Request.prototype.serialize = function () {
  let requestLine = [ this.method, this.URI, this.version ].join(' ');
  let header = Object.entries(this.header).reduce((str, header) => {
    return str + header.join(': ') + '\r\n';
  }, '');

  return [ requestLine, header, this.body ].join('\r\n');
};

Request.deserialize = function (text) {
  let request = new Request();

  if (typeof text === 'string') {
    let [ headers, body ] = text.split('\r\n\r\n');

    headers = headers.split('\r\n');

    let requestLine = headers.shift();
    let [ method, URI, version ] = requestLine.split(' ');

    request.method = method;
    request.URI = URI;
    request.version = version;

    request.header = {};

    headers.forEach((header) => {
      let [fieldName, fieldValue] = header.split(': ');
      request.header[fieldName.trim()] = fieldValue.trim();
    });

    request.body = body;
  }

  return request;
};

// let req = new Request();
// req.method = 'HTTP/1.1';
// req.URI = '200';
// req.version = 'Ok';
// req.header.Host = '127.0.0.1:9000';
// req.body = 'Hello World!';
//
// console.log(req.serialize());
// console.log(Request.deserialize(req.serialize()));

module.exports = Request;
