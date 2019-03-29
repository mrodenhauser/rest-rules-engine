const expect = require('chai').expect;
const switch_hold_test_cases = require('../test/switch_hold_test_cases.json');
const switch_hold_test_rules = require('../test/switch_hold_test_rules.json');
const rule_helper = require('../lib/rule.helper');

describe('Switch Hold logic tests', function () {
    for (let i = 0; i < switch_hold_test_cases.length; i++) {
        let item = switch_hold_test_cases[i];
        context(item.rule_name, function () {
            it('should be output message for Switch Hold', async function () {
                let engine_response = await rule_helper.evaluate(switch_hold_test_rules, item.fact, item.first_result_only);
                expect(engine_response.type).to.equal(item.type);
                expect(engine_response.params.actions[0].Message).to.equal(item.response);
            });
        });
    }
});
