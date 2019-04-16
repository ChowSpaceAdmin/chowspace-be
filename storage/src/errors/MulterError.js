class MulterError extends Error {

    constructor(message) {
        super(message);
        super.name = 'MulterError';
    }

}

module.exports = MulterError;
