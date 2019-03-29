const expect = require('chai').expect;
const bad_debt_test_rules = require('../test/bad_debt_test_rules.json');
const bad_debt_test_cases = require('../test/bad_debt_test_cases.json');
const rule_helper = require('../lib/rule.helper');

describe('Bad Debt logic tests', function () {
    for (let i = 0; i < bad_debt_test_cases.length; i++) {
        let item = bad_debt_test_cases[i];
        context(item.name, function () {
            if (item.pass) {
                it('should pass with response: ' + JSON.stringify(item.response), async function () {
                    try {
                        let engine_response = await rule_helper.evaluate(bad_debt_test_rules, item.fact, item.first_result_only);
                        expect(engine_response.type).to.equal(item.response.type);
                        expect(engine_response.params.Status).to.equal(item.response.params.Status);
                    }
                    catch (err) {
                        expect(err).to.equal(null);
                    }
                });
            }
            else {
                it('should fail with message: ' + item.response, async function () {
                    try {
                        let engine_response = await rule_helper.evaluate(bad_debt_test_rules, item.fact, item.first_result_only);
                    }
                    catch (err) {
                        expect(err).to.be.a('string');
                        expect(err).to.equal('No matching rule');
                    }
                });
            }
        });
    }
});
