const axios = require('axios');
const config = require('../server/config');

class ReservationService {

    constructor() {
        this.instance = axios.create({
            baseURL: `http://${config.RESERVATION_HOST}:${config.RESERVATION_PORT}`
        });
    }

    async getReservation(space, place, renter, owner, status, type, id) {
        const and = '&';
        let path = '/reservation/nodate?';

        if (space) path += 'space='+ space + and;
        if (place) path += 'place='+ place + and;
        if (renter) path += 'renter='+ renter + and;
        if (owner) path += 'owner='+ owner + and;
        if (status) path += 'status='+ status + and;
        if (type) path += 'type='+ type + and;
        if (id) path += 'id='+ id + and;

        const response = await this.instance.get(path);
        return response.data;
    }

}

module.exports = new ReservationService();
