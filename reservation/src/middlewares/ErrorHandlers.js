const reservationValidationErrorHandler = (error, req, res, next) => {
    if (error.name === 'ReservationValidationError') {
        res.status(400).send(error.errors);
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
    reservationValidationErrorHandler,
    authorizationErrorHandler,
    modelNotFoundErrorHandler,
    axiosErrorHandler,
    internalErrorHandler
];
