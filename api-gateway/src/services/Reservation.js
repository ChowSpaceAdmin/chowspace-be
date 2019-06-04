const axios = require('axios');
const config = require('../server/config');

class ReservationService {

    constructor() {
        this.instance = axios.create({
            baseURL: `http://${config.RESERVATION_HOST}:${config.RESERVATION_PORT}`
        });
    }

    async createReservation(payload) {
        const response = await this.instance.post('/reservation', payload);
        return response.data;
    }

}

module.exports = new ReservationService();
