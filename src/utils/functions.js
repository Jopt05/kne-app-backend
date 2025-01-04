const bycrypt = require('bcryptjs');

function encryptPassword(password) {
    const salt = bycrypt.genSaltSync();
    const hash = bycrypt.hashSync(password, salt);
    return hash;
}

function isValidPassword(password, hash) {
    return bycrypt.compareSync(password, hash);
}

module.exports = {
    encryptPassword,
    isValidPassword
}