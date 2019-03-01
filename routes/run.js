const router = require('express').Router();
const rules_helper = require('../lib/rule.helper');

router.post('/',
    //Validation middleware will validate input and set req.evaluation_request from body
    async function (req, res, next) {
        try {
            let request = req.body; //req.evaluation_request
            let result = await rules_helper.evaluate(request.rules, request.facts, request.first_result_only);
            res.send(result);
        }
        catch (err) {
            next(err);
        }
    });

module.exports = router;
