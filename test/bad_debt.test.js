const expect = require('chai').expect;
const bad_debt_test_rules = require('../test/bad_debt_test_rules.json');
const bad_debt_test_cases = require('../test/bad_debt_test_cases.json');
const rule_helper = require('../lib/rule.helper');

describe('Bad Debt logic tests', function () {
    for (let i = 0; i < bad_debt_test_cases.length; i++) {
        let item = bad_debt_test_cases[i];
        context(item.rule_name, function () {
            it('should be output message for Bad Debt', async function () {
                let engine_response = await rule_helper.evaluate(bad_debt_test_rules, item.fact, item.first_result_only);
                expect(engine_response.type).to.equal(item.type);
                expect(engine_response.params.actions[0].Message).to.equal(item.response);
            });
        });
    }
});
