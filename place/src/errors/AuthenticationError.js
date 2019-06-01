class AuthenticationError extends Error {

    constructor(message) {
        super(message);
        super.name = 'AuthenticationError';
    }

}

module.exports = AuthenticationError;
