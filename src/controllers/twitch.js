const { response } = require('express');
const { generateResponse } = require('../utils/response');
const axios = require('axios');

const getNewToken = async() => {
    const response = await axios.post(`${process.env.TWITCH_AUTH_URL}`, {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        grant_type: 'client_credentials'
    });
    if( response.status != 200 ) return null;
    return response.data.access_token;
}

const getStreamInfo = async(req, res = response) => {
    const token = await getNewToken();
    if( !token ) return generateResponse(500, 'Error getting token', null, res);
    
    const response = await axios.get(`${process.env.TWITCH_API_URL}/channels?broadcaster_id=${process.env.KNEKRO_BROADCASTER_ID}`, {
        headers: {
            'Client-Id': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${token}`
        }
    });
    if( response.status != 200 ) return generateResponse(500, 'Error getting stream title', null, res);

    return generateResponse(200, 'Obtained successfully', {
        title: response.data.data[0]
    }, res);
}

module.exports = {
    getStreamInfo
}