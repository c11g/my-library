const router = app => {
    app.get('/', (req, res) => {
      res.render('index.html');
    });

    app.get('/search', (req, res) => {
        const api_url = 'https://openapi.naver.com/v1/search/book.json';
        const client_info = {
            id: '4H3e4YWvZuPeN20K2BXI',
            secret: 'pBB3sOaWi1',
        };
        const request = require('request');
        const options = {
            url: `${api_url}?query=${req.query.keyword}`,
            headers: {'X-Naver-Client-Id':client_info.id, 'X-Naver-Client-Secret': client_info.secret}
         };

        request.get(options, (error, response, data) => {
            if (!error && response.statusCode == 200) {
                const info = JSON.parse(data);
                res.render('search.ejs', {books: info.items});
            } else {
                res.status(response.statusCode).end();
                console.log('error = ' + response.statusCode);
            }
        });
        
    });
};

module.exports = router;