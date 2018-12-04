require('should');

const zapier = require('zapier-platform-core');
const constants = require('../constants');
const buildLicenseKey = require('../utilities/license-key-builder');

const App = require('..');
const appTester = zapier.createAppTester(App);

const nock = require('nock');

describe('creates', () => {
    describe('create license', () => {
        it('should create a new license with expected key', (done) => {
            const userId = 'user 1';
            const expectedLicenseKey = buildLicenseKey(userId);
            const bundle = {
                inputData: {
                    productId: 'product 1',
                    userId: userId
                }
            };

            nock(constants.CRYPTLEX_API)
                .post('/licenses', (body) => {
                return body.key == `${expectedLicenseKey}`;
            })
                .reply(200, 
                    {
                        key: `${expectedLicenseKey}`,
                        productId: 'product 1'
                    }
                );

            appTester(App.creates.license_create.operation.perform, bundle)
                .then((result) => {
                    result.should.have.property('productId');
                    result.key.should.eql(`${expectedLicenseKey}`);
                    done();
                })
                .catch(done);
        });
    });

    describe('suspend license', () => {
        it('should suspend a license with expected key', (done) => {
            const userId = 'abc123';
            const expectedLicenseKey = buildLicenseKey(userId);
            const expectedLicenseId = 'efg456';
            const bundle = {
                inputData: {
                    userId: userId
                }
            };

            nock(constants.CRYPTLEX_API)
                .patch(`/licenses/${expectedLicenseId}`, (body) => {
                    return body.suspended == true;
                })
                .reply(200, 
                    {
                        key: `${expectedLicenseKey}`,
                        suspended: true
                    }
                );

            nock(constants.CRYPTLEX_API)
                .get(`/licenses`)
                .query({key: expectedLicenseKey})
                .reply(200,
                    [{
                        key: expectedLicenseKey,
                        id: expectedLicenseId
                    }]
                );

            appTester(App.creates.license_suspend.operation.perform, bundle)
                .then((result) => {
                    result.key.should.eql(expectedLicenseKey);
                    result.suspended.should.eql(true);

                    done();
                })
                .catch(done);
        });
    });
});