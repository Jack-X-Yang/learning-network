function Response () {
  this.version = undefined;
  this.statusCode = undefined;
  this.reasonPhrase = undefined;
  this.header = {};
  this.body = undefined;
}

Response.prototype.serialize = function () {
  let statusLine = [ this.version, this.statusCode, this.reasonPhrase ].join(' ');
  let header = Object.entries(this.header).reduce((str, header) => {
    return str + header.join(': ') + '\r\n';
  }, '');

  return [ statusLine, header, this.body ].join('\r\n');
};

Response.deserialize = function (text) {
  let response = new Response();

  if (typeof text === 'string') {
    let [ headers, body ] = text.split('\r\n\r\n');

    headers = headers.split('\r\n');

    let statusLine = headers.shift();
    let [ version, statusCode, reasonPhrase ] = statusLine.split(' ');

    response.version = version;
    response.statusCode = statusCode;
    response.reasonPhrase = reasonPhrase;

    headers.forEach((header) => {
      let [fieldName, fieldValue] = header.split(': ');
      response.header[fieldName.trim()] = fieldValue.trim();
    });

    response.body = body;
  }

  return response;
};

// let res = new Response();
// res.version = 'HTTP/1.1';
// res.statusCode = '200';
// res.reasonPhrase = 'Ok';
// res.header.Date = new Date();
// res.body = 'Hello World!';
//
// console.log(res.serialize());
// console.log(Response.deserialize(res.serialize()));
module.exports = Response;
