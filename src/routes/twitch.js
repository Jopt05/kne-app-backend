const { Router } = require('express');
const { validateJwt } = require('../utils/token');
const { getStreamInfo } = require('../controllers/twitch');

const router = Router();

router.get('/stream-info', [
    validateJwt,
]
, getStreamInfo);

module.exports = router;