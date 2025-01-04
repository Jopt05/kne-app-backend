const { response } = require('express');
const User = require('../models/user');
const { generateResponse } = require('../utils/response');

const getMe = async(req, res = response) => {
    
    const { email } = req.locals;

    const user = await User.findOne({ email });

    if (!user) {
        return generateResponse(400, 'User not found', null, res)
    }

    return generateResponse(200, 'User found', {
        ...user.dataValues
    }, res);
}

module.exports = {
    getMe
}