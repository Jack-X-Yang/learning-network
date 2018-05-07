const http = require('http');

http.get('http://127.0.0.1:9000', (res) => {
  let { header } = res;
  console.log(res.headers);

  res.on('data', function (chunk) {
    console.log('BODY:', chunk.toString());
  });
}).on('error', (error) => {
  console.error(error.message);
});
