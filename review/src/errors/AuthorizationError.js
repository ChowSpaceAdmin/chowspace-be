class AuthorizationError extends Error {

    constructor(message) {
        super(message);
        super.name = 'AuthorizationError';
    }

}

module.exports = AuthorizationError;
