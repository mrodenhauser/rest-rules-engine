const router = require('express').Router();
const rules_helper = require('../lib/rule.helper');
const validation_helper = require('../lib/validation.helper');
const rule_set_service = require('../lib/services/rule_set.service');
const evaluation_request_validation_middleware = validation_helper.validation_middleware('evaluation_request');
const fact_run_request_validation_middleware = validation_helper.validation_middleware('fact_run_request');
const fact_rule_name_request_validation_middleware = validation_helper.validation_middleware('fact_rule_name_request');
const jwt_middleware = require('../lib/middlewares/jwt.middleware');

router.use(jwt_middleware.verify_token({
    audience: process.env.BRE_AUDIENCE,
    issuer: process.env.BRE_ISSUER
}));

router.post('/:rule_set_id',
    validation_helper.id_param_validation_middleware('rule_set_id'),
    fact_run_request_validation_middleware,
    async function (req, res, next) {
        try {
            let rule_set_id = req.params.rule_set_id;
            let fact = req.fact_run_request.fact;
            let first_result_only = req.fact_run_request.first_result_only;
            let ruleset = await rule_set_service.getById(rule_set_id);
            if (ruleset) {
                let result = await rules_helper.evaluate(ruleset.rules, fact, first_result_only);
                res.send(result);
            }
            else {
                res.sendStatus(404);
            }
        }
        catch (err) {
            next(err);
        }
    });

router.post('/',
    evaluation_request_validation_middleware,
    async function (req, res, next) {
        try {
            let request = req.evaluation_request;
            let result = await rules_helper.evaluate(request.rules, request.fact, request.first_result_only);
            res.send(result);
        }
        catch (err) {
            next(err);
        }
    });

module.exports = router;
