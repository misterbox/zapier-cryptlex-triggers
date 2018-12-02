require('should');

const zapier = require('zapier-platform-core');
zapier.tools.env.inject();

const App = require('..');
const appTester = zapier.createAppTester(App);

const nock = require('nock');

describe('creates', () => {
    describe('create license', () => {
        it('should create a new license with expected key', (done) => {
            const bundle = {
                inputData: {
                    productId: 'product 1',
                    userId: 'user 1'
                }
            };

            nock(process.env.CRYPTLEX_API)
                .post('/licenses', (body) => {
                    return body.key == 'user 1_user 1';
                })
                .reply(200, 
                    {
                        key: 'user 1_user 1',
                        productId: 'product 1'
                    }
                );

            appTester(App.creates.license_create.operation.perform, bundle)
                .then((result) => {
                    result.should.have.property('productId');
                    result.key.should.eql('user 1_user 1');
                    done();
                })
                .catch(done);
        });
    });

    xdescribe('suspend license', () => {
        const bundle = {
            inputData: {
                userId: 'abc123'
            }
        };

        nock(process.env.CRYPTLEX_API)
            .post('/licenses')
    });
});