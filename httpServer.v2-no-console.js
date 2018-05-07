const net = require('net');

const server = net.createServer((socket) => {
  let response = 'HTTP/1.1 200 No Content\r\n' +
                 'Date: ' + new Date() + '\r\n' +
                 '\r\n' +
                 'Hello World!\r\n';

  console.log(response);
  socket.write(response);

  socket.on('end', () => {
    console.log('client disconnected');
  });
});

server.on('error', (err) => {
  throw err;
});

server.listen(9000, () => {
  console.log('server bound');
});
