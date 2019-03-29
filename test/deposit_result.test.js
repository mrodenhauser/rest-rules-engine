const expect = require('chai').expect;
const deposit_result_test_cases = require('../test/deposit_result_test_cases.json');
const deposit_result_test_rules = require('../test/deposit_result_test_rules.json');
const rule_helper = require('../lib/rule.helper');

describe('Deposit logic tests', function () {
    for (let i = 0; i < deposit_result_test_cases.length; i++) {
        let item = deposit_result_test_cases[i];
        context(item.rule_name, function () {
            it('should be output message for Depsoit Result', async function () {
                let engine_response = await rule_helper.evaluate(deposit_result_test_rules, item.fact, item.first_result_only);
                expect(engine_response.type).to.equal(item.type);
                expect(engine_response.params.actions[0].Message).to.equal(item.response);
            });
        });
    }
});
