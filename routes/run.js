const router = require('express').Router();
const rules_helper = require('../lib/rule.helper');
const validation_middleware = require('../lib/validation.helper').validation_middleware('evaluation_request');

router.post('/',
    validation_middleware,
    async function (req, res, next) {
        try {
            let request = req.body; //req.evaluation_request
            let result = await rules_helper.evaluate(request.rules, request.fact, request.first_result_only);
            res.send(result);
        }
        catch (err) {
            next(err);
        }
    });

// router.post('/ruleset', function (req, res, next) {
//     let valid = validate_rule_set(req.body);
//     if (valid) {
//         res.send(req.body);
//     }
//     else {
//         res.send(ajv.errorsText(validate_rule_set.errors));
//     }
// });

module.exports = router;
