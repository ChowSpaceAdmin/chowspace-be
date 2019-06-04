const axios = require('axios');
const config = require('../server/config');

class Storage {

    constructor() {
        this.PLACE_HOST = config.PLACE_HOST;
        this.PLACE_PORT = config.PLACE_PORT;
        this.connection = axios.create({
            baseURL: `http://${this.PLACE_HOST}:${this.PLACE_PORT}`
        });
    }

    async getPlace(space) {
        const response = await this.connection.get(`/place?space=${space}`);
        return response.data;
    }

}

module.exports = new Storage();
