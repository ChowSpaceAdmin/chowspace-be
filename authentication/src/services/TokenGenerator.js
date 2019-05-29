const jwt = require('jsonwebtoken');
const config = require('../server/config');
const AuthenticationError = require('../errors/AuthenticationError');

class TokenGenerator {

    constructor() {
        this.JWT_SECRET = config.JWT_SECRET;
        this.ACCESS = 'access';
        this.ACCESS_EXPIRES = '1 days';
        this.REFRESH = 'refresh';
        this.REFRESH_EXPIRES = '7 days';
    }

    createToken(payload, subject) {
        return new Promise((resolve, reject) => {
            let expiresIn;
            if (payload.typ === this.ACCESS) {
                expiresIn = this.ACCESS_EXPIRES;
            }
            else if (payload.typ === this.REFRESH) {
                expiresIn = this.REFRESH_EXPIRES;
            }
            else {
                reject(new Error('Unrecognised Token Type.'));
            }
    
            jwt.sign(payload, this.JWT_SECRET, {expiresIn,subject}, (err, encoded) => {
                if (err) reject(err);
                resolve(encoded);
            });
    
        });
    }
    
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.JWT_SECRET, (err, decoded) => {
                if (err) reject(new AuthenticationError('Invalid Token.'));
                resolve(decoded);
            });
        });
    }
    
    decode(token) {
        return jwt.decode(token);
    }

}

module.exports = new TokenGenerator();
