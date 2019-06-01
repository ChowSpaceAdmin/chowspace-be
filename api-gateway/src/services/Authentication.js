const axios = require('axios');
const config = require('../server/config');

class AuthenticationService {

    constructor() {
        this.instance = axios.create({
            baseURL: `http://${config.AUTHENTICATION_HOST}:${config.AUTHENTICATION_PORT}`
        });
    }

    async createUser(payload) {
        const response = await this.instance.post('/account', payload);
        return response.data;
    }
    
    async changePassword(payload) {
        const response = await this.instance.post('/account/changePassword', payload);
        return response.data;
    }
    
    async getAccountInfo(id) {
        const response = await this.instance.get(`/account/${id}`);
        return response.data;
    }
    
    async banAccount(id, payload) {
        const response = await this.instance.delete(`/account/${id}`, {
            data: payload
        });
        return response.data;
    }
    
    async updateAccount(form) {
        const response = await this.instance.patch('/profile', form, {
            headers: form.getHeaders()
        });
        return response.data;
    }
    
    async loginUser(payload) {
        const response = await this.instance.post('/authentication/login', payload);
        return response.data;
    }
    
    async refreshUser(payload) {
        const response = await this.instance.post('/authentication/refresh', payload);
        return response.data;
    }
    
    async verifyUser(payload) {
        const response = await this.instance.post('/authentication/verify', payload);
        return response.data;
    }

    async getProfile(id) {
        const response = await this.instance.get(`/profile/${id}`);
        return response.data;
    }

}

module.exports = new AuthenticationService();
