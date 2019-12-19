const request = require('request');

const router = app => {
	const api_url = 'https://openapi.naver.com/v1/search/book.json';
	const client_info = {
		id: '4H3e4YWvZuPeN20K2BXI',
		secret: 'pBB3sOaWi1',
	};
	
	app.get('/result/:start', (req, res) => {
		console.log(req.params, req.query)
		
		const options = {
			url: `${api_url}?query=${encodeURI(req.query.keyword)}`,
			headers: {
				'X-Naver-Client-Id': client_info.id,
				'X-Naver-Client-Secret': client_info.secret
			}
		};

		request.get(options, (error, response, data) => {
			if (!error && response.statusCode == 200) {
				const info = JSON.parse(data);
				res.render('list.ejs', {books: info.items, start: info.start});
			} else {
				console.log('error = ' + response.statusCode);
			}
		});
			
	});
};

module.exports = router;