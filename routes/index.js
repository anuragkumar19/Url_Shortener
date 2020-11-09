const router = require('express').Router();
const Url = require('../models/Url');

router.get('/:id', require('../controllers/redirect'));

module.exports = router;
