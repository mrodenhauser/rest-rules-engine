const jwt = require('express-jwt');
const public_pem = process.env.JWT_PUBLIC_ACCESS_KEY;
const _ = require('lodash');

let jwt_middleware = {};

jwt_middleware.verify_token = function (options) {
    let defaults = {
        secret: public_pem,
        algorithm: 'RS256'
    };
    let new_options = Object.assign(defaults, options);
    let jwt_validation = jwt(new_options);
    return jwt_validation;
};

jwt_middleware.verify_claims = function (claim_name, claim_value) {
    return function (req, res, next) {
        if (req.user.claims) {
            if (req.user.claims.Is_Admin) {
                return next();
            }
            if (req.user.claims[claim_name]) {
                if (req.user.claims[claim_name] === claim_value) {
                    return next();
                }
                else if (Array.isArray(req.user.claims[claim_name])) {
                    let claim_contains_value = _.some(req.user.claims[claim_name], function (value) {
                        return value === claim_value;
                    })
                    if (claim_contains_value) {
                        return next();
                    }
                    else {
                        return next({status: 401, message: 'You do not have the appropriate claim value to perform this action'});
                    }
                }
                else {
                    return next({status: 401, message: 'You do not have the appropriate claim value to perform this action'});
                }
            }
            else {
                return next({status: 401, message: 'You do not have the appropriate claim to perform this action'});
            }
        }
        next({status: 401, message: 'You do not have any claims'});
    };
};

module.exports = jwt_middleware;