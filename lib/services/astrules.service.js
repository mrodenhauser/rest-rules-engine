const db = require('../db.helper');

const AST_Conditions_Collections = db.get('AST_Conditions_Collections');
const AST_Events_Collections  = db.get('AST_Events_Collections');
const AST_Rules_Collections = db.get('AST_Rules_Collections');


var getRuleByName = async function (rule_name) {

    try {

        let condition = await AST_Conditions_Collections.findOne({type: rule_name});
        let event = await AST_Events_Collections.findOne({type: rule_name});

        if (condition && event && condition.conditions.length > 0 && event.events.length > 0) {

            let rules = [];
            condition.conditions.forEach(function (item) {

                let condition_type = item.type;

                let rule = {};
                rule.conditions = item.conditions;
                rule.priority = item.priority;

                let match = event.events.find(function (element) {
                    return element.event.type === condition_type;
                });

                if (match) {
                    rule.event = match.event;
                    rules.push(rule);
                }
            });

            return  rules;
        }

        return null;
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    getRuleByName : getRuleByName
};
