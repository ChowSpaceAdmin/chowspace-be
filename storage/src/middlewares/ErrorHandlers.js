const multerErrorHandler = (error, req, res, next) => {
    if (error.name === 'MulterError') {
        res.status(400).send({
            message: error.message
        });
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
    multerErrorHandler,
    internalErrorHandler
];
