const router = require('express').Router();
const validation_helper = require('../lib/validation.helper');
const rules_service = require('../lib/services/rule_set.service');
const condition_validation_middleware = validation_helper.validation_middleware('named_rule_set');
const jwt_middleware = require('../lib/middlewares/jwt.middleware');

router.use(jwt_middleware.verify_token({
    audience: process.env.BRE_AUDIENCE,
    issuer: process.env.BRE_ISSUER
}));

router.get('/:id', async function (req, res, next) {
    try {
        let result = await rules_service.getById(req.params.id);
        if (result) {
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

router.get('/', async function (req, res, next) {
    try {
        if (req.query.name){
            req.query.name = {
                $regex: req.query.name,
                $options: 'i'
            };
        }
        let results = await rules_service.search(req.query);
        if (results && results.length) {
            res.send(results);
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
    condition_validation_middleware,
    async function (req, res, next) {
        try {
            let rule_set = req.named_rule_set;
            let result = await rules_service.insert(rule_set);
            res.send(result);
        }
        catch (err) {
            next(err);
        }
    });


module.exports = router;
