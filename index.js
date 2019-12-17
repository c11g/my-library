const search = require('./search.js');

const app = require('express')();

const api_url = 'https://openapi.naver.com/v1/search/book.json';
const client_info = {
  id: '4H3e4YWvZuPeN20K2BXI',
  secret: 'pBB3sOaWi1',
};

app.get('/', (request, response) => {
  response.end('Hello World');
});

app.use('/Search', search);

app.listen(90, _ => {
  console.log('Example app listening on port 90')
});