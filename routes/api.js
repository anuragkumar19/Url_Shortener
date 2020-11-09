const router = require('express').Router();

router.post('/url/shorten', require('../controllers/url'));

module.exports = router;
