const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Search home page');
});

router.get('/detail', (req, res) => {
  res.send('Search detail page');
});

module.exports = router;