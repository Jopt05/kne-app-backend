const { response } = require('express');

const generateResponse = (code, msg, payload = null, res = response) =>{
    const data = {
        code: code,
        status: (code > 201) ? "warning" : "success",
        message: msg,
        data: (payload !==  null) ? payload : undefined,
        length: payload?.length,
    }
    return res.status(code).json(data);
}

module.exports = {
    generateResponse
}