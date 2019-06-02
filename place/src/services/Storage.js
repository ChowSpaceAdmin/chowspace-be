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

    async storeStatic(bufferFiles) {
        let form = new FormData();
        
        bufferFiles.forEach(bufferFile => {
            form.append('files', bufferFile.buffer, {
                filename: bufferFile.originalname,
                contentType: bufferFile.mimetype
            });
        });
    
        const response = await this.connection.post('/store/static', form, {
            headers: form.getHeaders()
        });
    
        return response.data;
    }

    async storeSecure(bufferFiles, user) {
        let form = new FormData();

        form.append('user', JSON.stringify(user));
        bufferFiles.forEach(bufferFile => {
            form.append('files', bufferFile.buffer, {
                filename: bufferFile.originalname,
                contentType: bufferFile.mimetype
            });
        });
        
        const response = await this.connection.post('/store/secure', form, {
            headers: form.getHeaders()
        });

        return response.data;
    }

    async getSecure(id, user) {
        const response = await this.connection.post(`/file/${id}`, {
            user
        }, {
            responseType: 'blob'
        });
        return response;
    }

    async deleteSecure(id, user) {
        const response = await this.connection.delete(`/file/${id}`, {
            data: {user}
        });
        return response.data;
    }

}

module.exports = new Storage();
