require('should');

const zapier = require('zapier-platform-core');
const constants = require('../constants');
const utils = require('../utils');

const App = require('..');
const appTester = zapier.createAppTester(App);

const nock = require('nock');

describe('creates', () => {
    describe('create license', () => {
        it('should create a new license with expected key', (done) => {
            const userId = 'user 1';
            const expectedLicenseKey = utils.buildLicenseKey(userId);
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

        it('should create a new license with metadata', (done) => {
            const userId = 'user 1';
            const expectedUserEmail = 'rick.sanchez@ump.com';
            const expectedFirstName = 'Rick';
            const expectedLastName = 'Sanchez';
            const expectedLicenseKey = utils.buildLicenseKey(userId);
            const bundle = {
                inputData: {
                    productId: 'product 1',
                    userId: userId,
                    email: expectedUserEmail,
                    firstName: expectedFirstName,
                    lastName: expectedLastName
                }
            };

            nock(constants.CRYPTLEX_API)
                .post('/licenses', (body) => {
                    return body.metadata != undefined && body.metadata.length == 3;
                })
                .reply(200, 
                    {
                        key: `${expectedLicenseKey}`,
                        productId: 'product 1',
                        metadata: [
                            {
                                visible: true,
                                key: 'firstName',
                                value: expectedFirstName
                            },
                            {
                                visible: true,
                                key: 'lastName',
                                value: expectedLastName
                            },
                            {
                                visible: true,
                                key: 'email',
                                value: expectedUserEmail
                            }
                        ]
                    }
                );

            appTester(App.creates.license_create.operation.perform, bundle)
                .then((result) => {
                    result.should.have.property('metadata');
                    const metaData = result.metadata;
                    const firstNameData = metaData[0];
                    const lastNameData = metaData[1];
                    const emailData = metaData[2];

                    firstNameData.key.should.eql('firstName');
                    firstNameData.value.should.eql(expectedFirstName);
                    lastNameData.key.should.eql('lastName');
                    lastNameData.value.should.eql(expectedLastName);
                    emailData.key.should.eql('email');
                    emailData.value.should.eql(expectedUserEmail);

                    done();
                })
                .catch(done);
        });
    });

    describe('suspend license', () => {
        it('should suspend a license with expected key', (done) => {
            const userId = 'abc123';
            const expectedLicenseKey = utils.buildLicenseKey(userId);
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

    describe('reactivate license', () => {
        it('should reactivate a license with expected key', (done) => {
            const userId = 'zyx432';
            const expectedLicenseKey = utils.buildLicenseKey(userId);
            const expectedLicenseId = 'IAmALicense';
            const bundle = {
                inputData: {
                    userId: userId
                }
            };

            nock(constants.CRYPTLEX_API)
                .patch(`/licenses/${expectedLicenseId}`, (body) => {
                    return body.suspended == false;
                })
                .reply(200, 
                    {
                        key: `${expectedLicenseKey}`,
                        suspended: false
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

            appTester(App.creates.license_reactivate.operation.perform, bundle)
                .then((result) => {
                    result.key.should.eql(expectedLicenseKey);
                    result.suspended.should.eql(false);

                    done();
                })
                .catch(done);
        });
    });

    describe('renew license', () => {
        it('should renew a license with expected key', (done) => {
            const userId = 'zyx432';
            const expectedLicenseKey = utils.buildLicenseKey(userId);
            const expectedLicenseId = 'IAmALicense';
            const bundle = {
                inputData: {
                    userId: userId
                }
            };

            nock(constants.CRYPTLEX_API)
                .post(`/licenses/${expectedLicenseId}/renew`)
                .reply(200, 
                    {
                        key: `${expectedLicenseKey}`,
                        id: `${expectedLicenseId}`
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

            appTester(App.creates.license_renew.operation.perform, bundle)
                .then((result) => {
                    result.key.should.eql(expectedLicenseKey);
                    result.id.should.eql(expectedLicenseId);

                    done();
                })
                .catch(done);
        });
    });
});