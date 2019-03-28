let db_middleware = {};

const audit_methods = ['insert', 'findOneAndUpdate', 'findOneAndDelete'];
const excluded_collections = ['Offers', 'Customer_Checks'];

const should_audit_collection = function (collection) {
    if (collection.includes('Audit')) {
        return false;
    }
    for (let i = 0; i < excluded_collections.length; i++) {
        if (excluded_collections[i] === collection) {
            return false;
        }
    }
    return true;
};

const should_audit_method = function (method) {
    for (let i = 0; i < audit_methods.length; i++) {
        if (method === audit_methods[i]) {
            return true;
        }
    }
    return false;
};

const get_action_from_method = function (method) {
    switch (method) {
        case 'insert':
            return 'Insert';
        case 'findOneAndUpdate':
            return 'Update';
        case 'findOneAndDelete':
            return 'Delete';
        default:
            return 'Unknown';
    }
};

db_middleware.audit_collections = function (context) {
    return function (next) {
        return function (args, method) {
            const user_name = (args.options || {}).user_name;

            // if it is, remove it so that it doesn't pollute the query
            if (typeof user_name !== 'undefined') {
                delete args.options.user_name;
            }

            if (method === 'insert' && !args.col.s.name.includes('Audit')) {
                args.data.Date_Created = new Date();
                args.data.Date_Last_Modified = new Date();
                if (user_name) {
                    args.data.Last_Modified_By = user_name;
                }
            }

            if (method === 'findOneAndUpdate') {
                args.update.$set.Date_Last_Modified = new Date();
                if (user_name) {
                    args.update.$set.Last_Modified_By = user_name;
                }
            }

            return next(args, method).then((res) => {
                const collection = args.col.s.name;
                let audit = should_audit_collection(collection) && should_audit_method(method);
                if (audit) {
                    let data = res;
                    let db = require('../db.helper');
                    const audit_log = db.get(collection + '_Audit');
                    let audit_item = {
                        Date_Created: new Date(),
                        Action: get_action_from_method(method),
                        Id: data._id,
                        Item: data
                    };
                    if (user_name) {
                        audit_item.User = user_name;
                    }
                    audit_log.insert(audit_item);
                }
                return res;
            });
        }
    }
};

module.exports = db_middleware;
