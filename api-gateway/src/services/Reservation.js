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

    async getReservation(space, place, renter, owner, status, type, id, day, month, year) {
        const and = '&';
        let path = '/reservation?';

        if (space) path += 'space='+ space + and;
        if (place) path += 'place='+ place + and;
        if (renter) path += 'renter='+ renter + and;
        if (owner) path += 'owner='+ owner + and;
        if (status) path += 'status='+ status + and;
        if (type) path += 'type='+ type + and;
        if (id) path += 'id='+ id + and;
        if (day) path += 'day='+ day + and;
        if (month) path += 'month='+ month + and;
        if (year) path += 'year='+ year + and;

        const response = await this.instance.get(path);
        return response.data;
    }

    async confirmReservation(id, payload) {
        const response = await this.instance.post(`/reservation/${id}`, payload);
        return response.data;
    }

    async getReservationNoDate(space, place, renter, owner, status, type, id) {
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
