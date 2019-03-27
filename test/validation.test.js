const expect = require('chai').expect;
const validation_helper = require('../lib/validation.helper');

describe('Validation Tests', function () {
    context('Error List of an array of strings', function () {
        const result = validation_helper.validate(['error1', 'error2'], 'error_list');
        it('should return valid', function () {
            expect(result).to.be.a('object');
            expect(result).to.have.property('Is_Valid');
            expect(result.Is_Valid).to.be.a('boolean');
            expect(result.Is_Valid).to.equal(true);
        });
        it('should not have errors', function () {
            expect(result).to.have.property('Errors');
            expect(result.Errors).to.be.a('Array');
            expect(result.Errors[0]).to.equal('No errors');
        });
    });
    context('Error List as a object', function () {
        const result = validation_helper.validate({'error': 'message'}, 'error_list');
        it('should return invalid', function () {
            expect(result).to.be.a('object');
            expect(result).to.have.property('Is_Valid');
            expect(result.Is_Valid).to.be.a('boolean');
            expect(result.Is_Valid).to.equal(false);
        });
        it('should have errors', function () {
            expect(result).to.have.property('Errors');
            expect(result.Errors).to.be.a('Array');
            expect(result.Errors[0]).to.equal('Item should be array');
        });
    });
});