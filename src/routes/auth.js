const { Router } = require('express');
const { createUser, login } = require('../controllers/auth');
const { check } = require('express-validator')
const { validateRequest } = require('../middlewares/fieldValidator');

const router = Router();

router.post('/register', [
    check('email', 'Email is required').isEmail(),
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    validateRequest
], createUser);

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validateRequest
], login);

module.exports = router;