const http = require('http');

http.get('http://www.360.cn', (res) => {
  let { header } = res;

  console.log('-------------------- HEAD BEGIN --------------------');
  console.log(res.headers);
  console.log('-------------------- HEAD END --------------------');

  res.on('data', function (chunk) {
    console.log('-------------------- BODY BEGIN --------------------');
    console.log('BODY:', chunk.toString());
    console.log('-------------------- BODY END --------------------');
  });
}).on('error', (error) => {
  console.log('-------------------- ERROR BEGIN --------------------');
  console.error(error.message);
  console.log('-------------------- ERROR END --------------------');
});
