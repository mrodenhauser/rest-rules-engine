const expect = require('chai').expect;
const available_date_test_rules = require('../test/available_date_test_rules.json');
const available_date_test_cases = require('../test/available_date_test_cases.json');
const rule_helper = require('../lib/rule.helper');

describe('Available Date logic tests', function () {
    for (let i = 0; i < available_date_test_cases.length; i++) {
        let item = available_date_test_cases[i];
        context(item.rule_name, async function () {
            it('Should have the correct type', async function () {
                let engine_response = await rule_helper.evaluate(available_date_test_rules, item.fact, item.first_result_only);
                expect(engine_response).to.be.a('object');
                expect(engine_response).to.have.property('type');
                expect(engine_response.type).to.equal(item.event.type);
            });
            it('Should have params and actions', async function () {
                let engine_response = await rule_helper.evaluate(available_date_test_rules, item.fact, item.first_result_only);
                expect(engine_response).to.be.a('object');
                expect(engine_response).to.have.property('params');
                expect(engine_response.params).to.be.a('object');
                expect(engine_response.params).to.have.property('actions');
                expect(engine_response.params.actions).to.be.a('array');
            });
        });
    }
});
