const { Router } = require('express');
const { getMe } = require('../controllers/users');
const { validateJwt } = require('../utils/token');

const router = Router();

router.get('/me', [
    validateJwt,
]
, getMe);

module.exports = router;