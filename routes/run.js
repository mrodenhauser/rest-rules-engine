const router = require('express').Router();
const rules_helper = require('../lib/rule.helper');
const validation_helper = require('../lib/validation.helper');
const astrulesservice_helper = require('../lib/services/astrules.service');
const evaluation_request_validation_middleware = validation_helper.validation_middleware('evaluation_request');
const fact_run_request_validation_middleware = validation_helper.validation_middleware('fact_run_request');
const fact_rule_name_request_validation_middleware = validation_helper.validation_middleware('fact_rule_name_request');
const rulesets = require('../data/rule_sets');
const _ = require('lodash');

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

router.post('/ruleset/:rule_set_id',
    fact_run_request_validation_middleware,
    async function (req, res, next) {
        try {
            let rule_set_id = parseInt(req.params.rule_set_id);
            let fact = req.fact_run_request.fact;
            let first_result_only = req.fact_run_request.first_result_only;
            let ruleset = _.find(rulesets, function (rs) {
                return rs.id === rule_set_id;
            });
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

    router.post('/rules/:rule_name',
    fact_rule_name_request_validation_middleware,
    async function (req, res, next) {
        try {
            let rule_name = req.body.rule_name;                                    
            let fact = req.body.fact;
            let first_result_only = req.fact_rule_name_request.first_result_only;
            let ruleset = astrulesservice_helper.get_by_rulename(rule_name, function (rs) {
                return null;
            });
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

module.exports = router;
