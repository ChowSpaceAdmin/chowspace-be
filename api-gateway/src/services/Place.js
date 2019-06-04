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

    async getLocations() {
        const response = await this.instance.get('/location');
        return response.data;
    }

    async searchPlace(name, location, isVerified, keywords) {
        const and = '&';
        let path = '/place?';
        if (name) path += 'name=' + name + and;
        if (location) path += 'location=' + location + and;
        if (isVerified) path += 'isVerified=' + isVerified + and;
        if (keywords) path += 'keywords=' + keywords;
        const response = await this.instance.get(path);
        return response.data;
    }

    async getOwnerPlace(user) {
        const response = await this.instance.post('/place/owner', {user});
        return response.data;
    }

    async uploadDocuments(form) {
        const response = await this.instance.post('/place/document', form, {
            headers: form.getHeaders()
        });
        return response.data;
    }

    async deleteDocument(id, user) {
        const response = await this.instance.delete(`/place/document/${id}`, {
            data: {user}
        });
        return response.data;
    }

    async verifyPlace(payload) {
        const response = await this.instance.post('/place/verify', payload);
        return response.data;
    }

    async getDocuments(payload) {
        const response = await this.instance.post('/place/documents', payload);
        return response.data;
    }

    async getSpaceMiniInfo(id) {
        const response = await this.instance.get(`/space/${id}`);
        return response.data;
    }

}

module.exports = new PlaceService();
