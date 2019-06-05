const axios = require('axios');
const config = require('../server/config');

class PlaceService {

    constructor() {
        this.instance = axios.create({
            baseURL: `http://${config.PLACE_HOST}:${config.PLACE_PORT}`
        });
    }

    async getPlaceInfo(id) {
        const response = await this.instance.get(`/place/${id}`);
        return response.data;
    }

}

module.exports = new PlaceService();
