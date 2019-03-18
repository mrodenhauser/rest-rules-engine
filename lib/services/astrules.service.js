const db = require('../db.helper');
const AST_Conditions_Collections = db.get('AST_Conditions_Collections');
const AST_Events_Collections  = db.get('AST_Events_Collections');
const AST_Rules_Collections = db.get('AST_Rules_Collections');

let astrules_service = {};
;

astrules_service.get_by_rulename = async function (rulename) {
    try{
     var conditions = await AST_Conditions_Collections.findOne({Type: rulename});
     var events = await AST_Events_Collections.findOne({Type: rulename});
     var rules = await AST_Rules_Collections.findOne({Type: rulename});
    

    }
    catch(err)
    {
        throw err;
    }
};

module.exports = astrules_service;
