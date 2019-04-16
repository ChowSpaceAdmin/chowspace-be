const axios = require('axios');
const FormData = require('form-data');

const config = require('../server/config');

const STORAGE_HOST = config.STORAGE_HOST;
const STORAGE_PORT = config.STORAGE_PORT;

const connection = axios.create({
    baseURL: `http://${STORAGE_HOST}:${STORAGE_PORT}`
});

const storeStatic = async (payload) => {
    let form = new FormData();
    
    form.append('file', payload.buffer, {
        filename: payload.originalname,
        contentType: payload.mimetype
    });

    const response = await connection.post('/store/static', form, {
        headers: form.getHeaders()
    });

    return response.data.location;
};


module.exports = {
    storeStatic
};
