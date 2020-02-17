const express = require('express');
const router = express.Router();
const request = require('request');

const api_url = 'https://openapi.naver.com/v1/search/book.json';
const CLIENT_INFO = {
	id: '4H3e4YWvZuPeN20K2BXI',
	secret: 'pBB3sOaWi1',
};
const display = 20;

router.get('/', (req, res) => {
	const keyword = req.query.keyword,
		start = req.query.startIndex;
	
	if ( !keyword ) {
		res.render('search', {
			keyword: null,
			total: 0,
			start: 1,
			display: display,
			message: '검색어를 입력하세요.'
		});
		return;
	};

	const options = {
		url: `${api_url}?query=${keyword ? encodeURI(keyword):null}&display=${display}&start=${start?start:1}`,
		headers: {
			'X-Naver-Client-Id': CLIENT_INFO.id,
			'X-Naver-Client-Secret': CLIENT_INFO.secret
		}
	};

	request.get(options, (error, response, data) => {
		const info = JSON.parse(data);
		if (!error && response.statusCode == 200) {
			res.render('search', {
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

module.exports = router;