const { generateResponse } = require('../utils/response')
const User = require('../models/user');
const { isValidPassword } = require('../utils/functions');
const { generateJwt } = require('../utils/token')

const createUser = async(req, res) => {
    
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });

    await user.save();

    const token = await generateJwt(user.id, user.email);

    return generateResponse(200, 'User created successfully', {
        ...user.dataValues,
        token
    }, res)
}

const login = async(req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return generateResponse(400, 'User not found', null, res)
    }

    if ( !isValidPassword(password, user.password) ) {
        return generateResponse(400, 'Invalid password', null, res)
    }

    const token = await generateJwt(user.id, user.email);

    return generateResponse(200, 'User logged in successfully', {
        ...user.dataValues,
        token
    }, res)
}

module.exports = {
    createUser,
    login
}