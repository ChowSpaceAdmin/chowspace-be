const authenticationService = require('../services/Authentication');
const AuthenticationError = require('../errors/AuthenticationError');

const authenticate = async (req, res, next) => {
    try {
        let token = req.get('Authorization');
        if (!token) throw new AuthenticationError('Authentication is required.'); 

        token = token.replace('Bearer ', '');
        const data = await authenticationService.verifyUser({access:token});
        req.body.user = data.user;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    authenticate
};
