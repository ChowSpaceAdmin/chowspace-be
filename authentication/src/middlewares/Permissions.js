const AuthorizationError = require('../errors/AuthorizationError');

const activeAccount = (req, res, next) => {
    if (req.body.user && req.body.user.isActive) {
        next();
    } else {
        next(new AuthorizationError('Permission Denied. Account Inactive.'));
    }
};

const adminAccount = (req, res, next) => {
    if (req.body.user && req.body.user.isAdmin) {
        next();
    } else {
        next(new AuthorizationError('Permission Denied. Admin Account Required.'));
    }
};

module.exports = {
    activeAccount,
    adminAccount
};
