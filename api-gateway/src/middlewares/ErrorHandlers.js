const axiosErrorHandler = (error, req, res, next) => {
    if (error.response) {
        res.status(error.response.status).send(error.response.data);
    } else {
        next(error);
    }
};

const authenticationErrorHandler = (error, req, res, next) => {
    if (error.name === 'AuthenticationError') {
        res.status(401).send({
            'Authentication': error.message
        });
    } else {
        next(error);
    }
};

const internalErrorHandler = (error, req, res, next) => {
    console.log(error);
    res.status(500).send({
        error: error.message
    });
};

module.exports = [
    axiosErrorHandler,
    authenticationErrorHandler,
    internalErrorHandler
];
