const express = require('express');
const app = express();
const router = require('./router/main.js')(app);
const ejs = require('ejs');

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(express.static('public'));

app.listen(90, () => {
  console.log('Example app listening on port 90')
});