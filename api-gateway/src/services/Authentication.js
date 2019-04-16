const axios = require('axios');

const config = require('../server/config');

const instance = axios.create({
    baseURL: `http://${config.AUTHENTICATION_HOST}:${config.AUTHENTICATION_PORT}`
});

const createUser = async (payload) => {
    const response = await instance.post('/account', payload);
    return response.data;
};

const changePassword = async (payload) => {
    const response = await instance.post('/account/changePassword', payload);
    return response.data;
};

const getAccountInfo = async (id) => {
    const response = await instance.get(`/account/${id}`);
    return response.data;
};

const banAccount = async (id, payload) => {
    const response = await instance.delete(`/account/${id}`, {
        data: payload
    });
    return response.data;
};

const updateAccount = async (form) => {
    const response = await instance.patch('/profile', form, {
        headers: form.getHeaders()
    });
    return response.data;
};

const loginUser = async (payload) => {
    const response = await instance.post('/authentication/login', payload);
    return response.data;
};

const refreshUser = async (payload) => {
    const response = await instance.post('/authentication/refresh', payload);
    return response.data;
};

const verifyUser = async (payload) => {
    const response = await instance.post('/authentication/verify', payload);
    return response.data;
};

module.exports = {
    createUser,
    changePassword,
    getAccountInfo,
    banAccount,
    updateAccount,
    loginUser,
    refreshUser,
    verifyUser
};
