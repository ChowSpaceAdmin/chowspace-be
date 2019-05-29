class FileNotFoundError extends Error {

    constructor(message) {
        super(message);
        super.name = 'FileNotFoundError';
    }

}

module.exports = FileNotFoundError;
