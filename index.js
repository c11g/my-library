const express = require('express');
const app = express();
const request = require('request');
const ejs = require('ejs');

const api_url = 'https://openapi.naver.com/v1/search/book.json';
const client_info = {
	id: '4H3e4YWvZuPeN20K2BXI',
	secret: 'pBB3sOaWi1',
};
const display = 20;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(express.static('public'));
app.get('/', (req, res) => {
	res.render('index.ejs');
});
app.get('/search', (req, res) => {
	const keyword = req.query.keyword,
		start = req.query.start;
	
	if ( !keyword ) {
		res.render('search.ejs', {
			keyword: null,
			total: 0,
			start: 1,
			display: display,
			message: '검색어를 입력하세요.'
		});
		return;
	};

	const options = {
		url: `${api_url}?query=${keyword ? encodeURI(keyword):null}&display=${display?display:10}&start=${start?start:1}`,
		headers: {
			'X-Naver-Client-Id': client_info.id,
			'X-Naver-Client-Secret': client_info.secret
		}
	};

	request.get(options, (error, response, data) => {
		const info = JSON.parse(data);
		if (!error && response.statusCode == 200) {
			res.render('search.ejs', {
				message: '검색 결과가 없습니다.',
				keyword: keyword,
				total: info.total,
				start: info.start,
				display: display,
				total_page: Math.ceil(info.total/display),
				current_page: Math.ceil(info.start/display),
				books: info.items,
			});
		} else {
			res.set('Content-Type', 'text/html');
			res.end(`Error ${info.errorCode}: ${info.errorMessage}`);
		}
	});
});

app.listen(90, () => {
  console.log('Example app listening on port 90')
});