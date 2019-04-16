class ValidationError extends Error {

    constructor(message, field) {
        super(message);
        super.name = 'ValidationError';
        this.errors = {};
        this.errors[field] = {
            message,
            path: field
        };
    }

}

module.exports = ValidationError;
