var path = require('path');
require('dotenv').config({ path: dotEnvPath}) 
var dotEnvPath = path.resolve('./.env');
const expect = require('chai').expect;
const test_cases = require('./astrules_test_cases.json');
const _ = require('lodash');
const astrules_helper = require('../lib/services/astrules.service');
const rules = require('../test/available_date_test_rules.json');
const rule_helper = require('../lib/rule.helper');

describe('AST Rules',function(){

test_cases.forEach(function(test) {
    
  context(JSON.stringify(test), async function(){

    // it('should be an object', async function(){      
    //   let response = await astrules_helper.getRuleByName(test.rule_name);
    //   expect(response).to.be.a('object');
    // });    
  
    let available_date_test_rules = require('../test/available_date_test_rules.json');
    let bad_debt_test_rules = require('../test/bad_debt_test_rules.json');
    let bad_debt_test_cases = require('../test/bad_debt_test_cases.json');
    
    it('should be output message for Bad Debt', async function(){      
      let engine_response = await rule_helper.evaluate(bad_debt_test_rules,bad_debt_test_cases.fact,bad_debt_test_cases.first_result_only);
      expect(engine_response).to.equal(bad_debt_Test_cases.Message);
    });

    // it('should be an object', async function(){      
    //   let engine_response = await rule_helper.evaluate(available_date_test_rules,test.fact,test.first_result_only);
    //   expect(engine_response).to.equal(test.event);
    // });

  });

});

});