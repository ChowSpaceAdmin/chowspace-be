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
        if (type) path += `type=${type}`;
        const response = await this.instance.get(path);
        return response.data;
    }

    async updateKeyword(form, id) {
        const response = await this.instance.patch(`/keyword/${id}`, form, {
            headers: form.getHeaders()
        });
        return response.data;
    }

    async createPlace(form) {
        const response = await this.instance.post('/place', form, {
            headers: form.getHeaders()
        });
        return response.data;
    }

    async getPlaceDetail(id) {
        const response = await this.instance.get(`/place/${id}`);
        return response.data;
    }

    async createSpace(form) {
        const response = await this.instance.post('/space', form, {
            headers: form.getHeaders()
        });
        return response.data;
    }

}

module.exports = new PlaceService();
