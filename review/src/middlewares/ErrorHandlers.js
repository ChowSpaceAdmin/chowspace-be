const _ = require('lodash');

const validationErrorHandler = (error, req, res, next) => {
    if (error.name === 'ValidationError') {
        let result = {};
        const keys = _.keys(error.errors);
        
        keys.forEach((key) => {
            const path = error.errors[key].path;
            const message = error.errors[key].message;
            result[path] = message;
        });
        
        res.status(400).send(result);
    } else {
        next(error);
    }
};

const authorizationErrorHandler = (error, req, res, next) => {
    if (error.name === 'AuthorizationError') {
        res.status(403).send({
            'Authorization': error.message
        });
    } else {
        next(error);
    }
};

const modelNotFoundErrorHandler = (error, req, res, next) => {
    if (error.name === 'ModelNotFoundError') {
        res.status(400).send({
            'error': error.message
        });
    } else {
        next(error);
    }
};

const axiosErrorHandler = (error, req, res, next) => {
    if (error.response) {
        res.status(error.response.status).send(error.response.data);
    } else {
        next(error);
    }
};

const internalErrorHandler = (error, req, res, next) => {
    console.log(error);
    res.status(500).send({
        'error': 'Something Went Wrong.'
    });
};

module.exports = [
    validationErrorHandler,
    authorizationErrorHandler,
    modelNotFoundErrorHandler,
    axiosErrorHandler,
    internalErrorHandler
];
