const monk = require('monk');
const logger = require('log-driver').logger;
const db_middleware = require('../lib/middlewares/db.middleware');

let db;
if (process.env.MONGO_AUTH_SOURCE) {
    db = monk(process.env.MONGO_CONN_STRING, {authSource: process.env.MONGO_AUTH_SOURCE});
}
else {
    db = monk(process.env.MONGO_CONN_STRING);
}

db
    .then(function () {
        let log_obj = {
            message: 'Successfully connected to mongodb'
        };
        logger.info(log_obj);
    })
    .catch(function (err) {
        let log_obj = {
            message: 'Connection Failed to mongodb',
            error: err
        };
        logger.error(log_obj);
    });


db.addMiddleware(db_middleware.audit_collections);

module.exports = db;
