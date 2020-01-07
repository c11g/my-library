const express = require('express');
const app = express();

const indexRouter = require('./routes/index');
const searchRouter = require('./routes/search');

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/search', searchRouter);


app.listen(90, () => {
  console.log('Example app listening on port 90')
});