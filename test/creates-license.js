require('should');

const zapier = require('zapier-platform-core');

const App = require('..');
const appTester = zapier.createAppTester(App);

const nock = require('nock');

describe('creates', () => {
    it('should create a new license', (done) => {
        const bundle = {
            inputData: {
                productId: 'product 1',
                userId: 'user 1'
            }
        };

        nock('https://api.cryptlex.com/v3')
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
                done();
            })
            .catch(done);
    });
});