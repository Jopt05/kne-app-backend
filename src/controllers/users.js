const { response } = require('express');

const getUsers = (req, res = response) => {
    return res.json({
        msg: 'get API - controller'
    })
}

module.exports = {
    getUsers
}