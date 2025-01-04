const { Router } = require('express');
const { validateJwt } = require('../utils/token');
const { getStreamInfo, getLastGames } = require('../controllers/twitch');

const router = Router();

router.get('/stream-info', [
    validateJwt,
]
, getStreamInfo);

router.get('/streams-info', [
    validateJwt,
]
, getLastGames);

module.exports = router;