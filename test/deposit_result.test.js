var path = require('path');
require('dotenv').config({ path: dotEnvPath}) 
var dotEnvPath = path.resolve('./.env');
const expect = require('chai').expect;
const _ = require('lodash');
let deposit_result_test_cases = require('../test/deposit_result_test_cases.json');
let deposit_result_test_rules = require('../test/deposit_result_test_rules.json');
const rule_helper = require('../lib/rule.helper');

describe('Deposit logic tests',function(){

    it('should be output message for Depsoit Result', async function(){   
      
      try
      {
        deposit_result_test_cases.forEach( async function (item) {
         let engine_response = await rule_helper.evaluate(deposit_result_test_rules,item.fact,item.first_result_only);   
         console.log(engine_response);     
         let result= JSON.parse(JSON.stringify(engine_response));         
         if(result!=null)
         {
            expect(result.type).to.equal(item.type); 
            expect(result.params.actions[0].Message).to.equal(item.response);
         }
         else{
           expect(result).to.equal(null);
         }
       });
      }
      catch(err)
      {
        console.log(err); 
      }       
  });
});