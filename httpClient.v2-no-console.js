const net = require('net');

const HOST = '127.0.0.1:9000';
const PORT = 9000;

let client = new net.Socket();

client.connect(PORT, HOST, function() {
  console.log('>>>>>>>>>>>>>>>>>>>> SOCKET CONNECT <<<<<<<<<<<<<<<<<<<<');
  console.log('CONNECTED TO: ' + HOST + ':' + PORT);

  let request = 'GET / HTTP/1.1\r\n' +
                'Host: ' + HOST + ':' + PORT + '\r\n' +
                'Connection: close\r\n' +
                '\r\n';

  console.log(request);

  client.write(request);
});

client.on('data', function(data) {
  console.log(data.toString());
  client.destroy();
});

client.on('close', function() {
  console.log('>>>>>>>>>>>>>>>>>>>> SOCKET CLOSE <<<<<<<<<<<<<<<<<<<<');
});

client.on('error', function(error) {
  console.log(error);
});
