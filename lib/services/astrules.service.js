const db = require('../db.helper');

const conditions_collection = db.get('Conditions');
const events_collection = db.get('Events');
const rules_collection = db.get('Rules');

let rule_service = {};

rule_service.getRuleByName = async function (rule_name) {

    try {

        let condition = await conditions_collection.findOne({type: rule_name});
        let event = await events_collection.findOne({type: rule_name});

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

            return rules;
        }

        return null;
    }
    catch (err) {
        throw err;
    }
};

rule_service.conditions = crud_functions(conditions_collection);

rule_service.events = crud_functions(events_collection);

rule_service.rules = crud_functions(rules_collection);

function crud_functions(collection) {
    let crud_operations = {};
    crud_operations.insert = async function (condition) {
        try {
            let inserted = await collection.insert(condition);
            return inserted;
        }
        catch (err) {
            throw err;
        }
    };

    crud_operations.getById = async function (id) {
        try {
            let result = await collection.findOne({_id: id});
            return result;
        }
        catch (err) {
            return err;
        }
    };

    crud_operations.search = async function (query) {
        try {
            let results = collection.find(query);
        }
        catch (err) {
            throw err;
        }
    };

    crud_operations.update = async function (update_def) {
        try {
            let updated = await collection.findOneAndUpdate({_id: id}, {$set: update_def});
            return updated;
        }
        catch (err) {
            throw err;
        }
    };

    crud_operations.delete = async function (id) {
        try {
            let deleted = await collection.findOneAndDelete({_id: id});
            return deleted;
        }
        catch (err) {
            throw err;
        }
    };

    return crud_operations;
}

module.exports = rule_service;
