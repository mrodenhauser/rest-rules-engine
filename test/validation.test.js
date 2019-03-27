const expect = require('chai').expect;
const validation_helper = require('../lib/validation.helper');
const mock = require('mock-req-res');

describe('Validation Tests', function () {
    context('Simple Validation', function () {
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
    context('Validation Middleware for Id validation', function () {
        context('Creating id middleware with no params', function () {
            let id_validation_middleware = validation_helper.id_param_validation_middleware();
            it('should return a function', function () {
                expect(id_validation_middleware).to.be.a('function');
            });
            it('should call next with error when passed no params in request', function (done) {
                id_validation_middleware(mock.mockRequest(), mock.mockResponse(), function (err, req, res, next) {
                    expect(err).to.be.a('error');
                    expect(err.message).to.be.a('string');
                    expect(err.message).to.equal('parameter "id" not found');
                    done();
                });
            });
            it('should call next with error when passed wrong params in request', function (done) {
                id_validation_middleware(mock.mockRequest({params: {not_id: '477abf'}}), mock.mockResponse(), function (err, req, res, next) {
                    expect(err).to.be.a('error');
                    expect(err.message).to.be.a('string');
                    expect(err.message).to.equal('parameter "id" not found');
                    done();
                });
            });
            it('should call next with error when passed invalid id param in request', function (done) {
                id_validation_middleware(mock.mockRequest({params: {id: '477abf'}}), mock.mockResponse(), function (err, req, res, next) {
                    expect(err).to.be.a('error');
                    expect(err.message).to.be.a('string');
                    expect(err.message).to.equal('id is not in the correct format');
                    done();
                });
            });
            it('should call next with no errors when a valid id in request is sent', function () {
                id_validation_middleware(mock.mockRequest({params: {id: '5c990698b5bc4429806e2cc3'}}), mock.mockResponse(), function (err, req, res, next) {
                    expect(err).to.be.a('undefined');
                });
            });
        });
    });
    context('Validation Middleware for request body validation', function () {
        context('Creating validation middleware with error list', function () {
            let error_list_validation_middleware = validation_helper.validation_middleware('error_list');
            it('should return a function', function () {
                expect(error_list_validation_middleware).to.be.a('function');
            });
            it('should call next with error when passed no params in request', function (done) {
                error_list_validation_middleware(mock.mockRequest(), mock.mockResponse(), function (err, req, res, next) {
                    expect(err).to.be.a('error');
                    expect(err.message).to.be.a('string');
                    expect(err.message).to.equal('No request body found');
                    done();
                });
            });
            it('should call next with error when passed invalid id param in request', function (done) {
                error_list_validation_middleware(mock.mockRequest({body: {not_an_error: 'stuff'}}), mock.mockResponse(), function (err, req, res, next) {
                    expect(err).to.be.a('array');
                    expect(err[0]).to.equal('Item should be array');
                    done();
                });
            });
            it('should call next with no errors when a valid id in request is sent', function (done) {
                error_list_validation_middleware(mock.mockRequest({body: ['error1', 'error2']}), mock.mockResponse(), function (err, req, res, next) {
                    expect(err).to.be.a('undefined');
                    done();
                });
            });
        });
    });
});