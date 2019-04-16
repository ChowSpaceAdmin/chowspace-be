const jwt = require('jsonwebtoken');

const config = require('../server/config');
const AuthenticationError = require('../errors/AuthenticationError');

const JWT_SECRET = config.JWT_SECRET;
const ACCESS = 'access';
const ACCESS_EXPIRES = '1 days';
const REFRESH = 'refresh';
const REFRESH_EXPIRES = '7 days';

const createToken = (payload, subject) => {
    return new Promise((resolve, reject) => {
        let expiresIn;
        if (payload.typ === ACCESS) {
            expiresIn = ACCESS_EXPIRES;
        }
        else if (payload.typ === REFRESH) {
            expiresIn = REFRESH_EXPIRES;
        }
        else {
            reject(new Error('Unrecognised Token Type.'));
        }

        jwt.sign(payload, JWT_SECRET, {expiresIn,subject}, (err, encoded) => {
            if (err) reject(err);
            resolve(encoded);
        });

    });
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) reject(new AuthenticationError('Invalid Token.'));
            resolve(decoded);
        });
    });
};

const decode = (token) => {
    return jwt.decode(token);
};

module.exports = {
    createToken,
    verifyToken,
    decode,
    ACCESS,
    REFRESH
};
