const axios = require('axios');
const FormData = require('form-data');
const config = require('../server/config');

class Storage {

    constructor() {
        this.STORAGE_HOST = config.STORAGE_HOST;
        this.STORAGE_PORT = config.STORAGE_PORT;
        this.connection = axios.create({
            baseURL: `http://${this.STORAGE_HOST}:${this.STORAGE_PORT}`
        });
    }

    async storeStatic(bufferFile) {
        let form = new FormData();
        
        form.append('files', bufferFile.buffer, {
            filename: bufferFile.originalname,
            contentType: bufferFile.mimetype
        });
    
        const response = await this.connection.post('/store/static', form, {
            headers: form.getHeaders()
        });
    
        return response.data;
    }

}

module.exports = new Storage();
