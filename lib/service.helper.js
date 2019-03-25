let service_helper = {};

service_helper.generate_crud_functions = function (collection) {
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
            return results;
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
};

module.exports = service_helper;