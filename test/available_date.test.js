var path = require('path');
require('dotenv').config({ path: dotEnvPath}) 
var dotEnvPath = path.resolve('./.env');
const expect = require('chai').expect;
const _ = require('lodash');
let available_date_test_rules = require('../test/available_date_test_rules.json');
let available_date_test_cases = require('../test/available_date_test_cases.json');
const rule_helper = require('../lib/rule.helper');

describe('Available Date logic tests',function(){

    it('Available Date Event', async function(){   
      
      try
      {
        available_date_test_cases.forEach( async function (item) {
   
         let engine_response = await rule_helper.evaluate(available_date_test_rules,item.fact,item.first_result_only);   
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