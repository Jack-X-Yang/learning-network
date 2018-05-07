const net = require('net');

const server = net.createServer((socket) => {
  console.log('>>>>>>>>>>>>>>>>>>>> client connected <<<<<<<<<<<<<<<<<<<<');

  socket.on('data', (data) => {
    console.log('-------------------- REQUEST BEGIN --------------------');
    console.log(data.toString());
    console.log('-------------------- REQUEST END --------------------');

    let response = 'HTTP/1.1 200 No Content\r\n' +
                   'Date: ' + new Date() + '\r\n' +
                   '\r\n' +
                   'Hello World!';

    console.log('-------------------- RESPONSE BEGIN --------------------');
    console.log(response);
    console.log('-------------------- RESPONSE END --------------------');

    socket.write(response);
  });

  socket.on('end', () => {
    console.log('>>>>>>>>>>>>>>>>>>>> client disconnected <<<<<<<<<<<<<<<<<<<<');
  });
});

server.on('error', (err) => {
  throw err;
});

server.listen(9000, () => {
  console.log('SERVER BOUND');
});
