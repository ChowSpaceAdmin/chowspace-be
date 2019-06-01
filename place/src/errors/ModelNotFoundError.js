class ModelNotFoundError extends Error {

    constructor(message) {
        super(message);
        super.name = 'ModelNotFoundError';
    }

}

module.exports = ModelNotFoundError;
