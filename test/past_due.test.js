const expect = require('chai').expect;
const past_due_test_cases = require('../test/past_due_test_cases.json');
const past_due_test_rules = require('../test/past_due_test_rules.json');
const rule_helper = require('../lib/rule.helper');

describe('Past Due logic tests', function () {
    for (let i = 0; i < past_due_test_cases.length; i++) {
        let item = past_due_test_cases[i];
        context(item.rule_name, function () {
            it('should be output message for Past Due', async function () {
                let engine_response = await rule_helper.evaluate(past_due_test_rules, item.fact, item.first_result_only);
                expect(engine_response.type).to.equal(item.type);
                expect(engine_response.params.actions[0].Message).to.equal(item.response);
            });
        });
    }
});
