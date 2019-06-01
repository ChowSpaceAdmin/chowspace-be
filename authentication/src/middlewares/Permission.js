const AuthorizationError = require('../errors/AuthorizationError');

class Permission {

    activeAccount(req, res, next) {
        if (req.body.user && req.body.user.isActive) {
            next();
        } else {
            next(new AuthorizationError('Permission Denied. Account Inactive.'));
        }
    }

    adminAccount(req, res, next) {
        if (req.body.user && req.body.user.isAdmin) {
            next();
        } else {
            next(new AuthorizationError('Permission Denied. Admin Account Required.'));
        }
    }

}

module.exports = new Permission();
