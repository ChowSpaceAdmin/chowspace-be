const axios = require('axios');
const config = require('../server/config');

class PlaceService {

    constructor() {
        this.instance = axios.create({
            baseURL: `http://${config.PLACE_HOST}:${config.PLACE_PORT}`
        });
    }
    
    async createKeyword(form) {
        const response = await this.instance.post('/keyword', form, {
            headers: form.getHeaders()
        });
        return response.data;
    }

    async getKeyword(type) {
        let path = '/keyword?';
        if (type)   path += `type=${type}`;
        const response = await this.instance.get(path);
        return response.data;
    }

}

module.exports = new PlaceService();