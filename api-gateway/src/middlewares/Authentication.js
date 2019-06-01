const AuthenticationService = require('../services/Authentication');
const AuthenticationError = require('../errors/AuthenticationError');

class Authentication {

    async authenticate(req, res, next) {
        try {
            let token = req.get('Authorization');
            if (!token) throw new AuthenticationError('Authentication is required.'); 
    
            token = token.replace('Bearer ', '');
            const data = await AuthenticationService.verifyUser({access:token});
            req.user = data.user;
            next();
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new Authentication();
