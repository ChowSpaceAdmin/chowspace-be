const axios = require('axios');
const config = require('../server/config');

class ReviewService {

    constructor() {
        this.instance = axios.create({
            baseURL: `http://${config.REVIEW_HOST}:${config.REVIEW_PORT}`
        });
    }

    async createReview(payload) {
        const response = await this.instance.post('/review', payload);
        return response.data;
    }

    async getReview(user, place, rating, owner) {
        const and = '&';
        let path = '/review?';

        if (user) path += 'user=' + user + and;
        if (place) path += 'place=' + place + and;
        if (rating) path += 'rating=' + rating + and;
        if (owner) path += 'owner=' + owner + and;

        const response = await this.instance.get(path);
        return response.data;
    }

    async updateReview(id, payload) {
        const response = await this.instance.patch(`/review/${id}`, payload);
        return response.data;
    }

    async replyReview(id, payload) {
        const response = await this.instance.post(`/review/reply/${id}`, payload);
        return response.data;
    }

}

module.exports = new ReviewService();
