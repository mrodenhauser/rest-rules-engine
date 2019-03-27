const validation = require('../specs/swagger.json');
const Ajv = require('ajv');
const ajv = new Ajv({removeAdditional: true, allErrors: true});
const validate = ajv
    .addSchema(validation, 'validation.json');

let validation_helper = {};

validation_helper.validate = function (model, type) {
    return {
        Is_Valid: validate.validate({$ref: 'validation.json#/components/schemas/' + type}, model),
        Errors: ajv.errorsText(validate.errors, {dataVar: 'Item'}).split(', ')
    };
};

validation_helper.id_param_validation_middleware = function (param_name = 'id') {
    return function (req, res, next) {
        if (req && req.params && req.params[param_name]) {
            let is_valid = validate.validate(require('../specs/definitions/id'), req.params[param_name]);
            if (is_valid) {
                next();
            }
            else {
                next(new Error('id is not in the correct format'));
            }
        }
        else {
            next(new Error('parameter "' + param_name + '" not found'));
        }
    };
};

validation_helper.validation_middleware = function (type) {
    return function (req, res, next) {
        try {
            let item = req.body;
            let validation_result = validation_helper.validate(item, type);

            if (validation_result) {
                if (validation_result.Is_Valid) {
                    req[type] = item;
                    next();
                }
                else {
                    res.status(400).send(validation_result.Errors);
                }

            }
            else {
                next(new Error('Error validating input'));
            }
        }
        catch (err) {
            next(err);
        }
    };
};

module.exports = validation_helper;
