const expect = require('chai').expect;
const premise_type_test_cases = require('../test/premise_type_test_cases.json');
const premise_type_test_rules = require('../test/premise_type_test_rules.json');
const rule_helper = require('../lib/rule.helper');

describe('Premise Type logic tests', function () {
    for (let i = 0; i < premise_type_test_cases.length; i++) {
        let item = premise_type_test_cases[i];
        context(item.rule_name, function () {
            it('should be output message for Premise Type', async function () {
                let engine_response = await rule_helper.evaluate(premise_type_test_rules, item.fact, item.first_result_only);
                expect(engine_response.type).to.equal(item.type);
                expect(engine_response.params.actions[0].Message).to.equal(item.response);
            });
        });
    }
});
