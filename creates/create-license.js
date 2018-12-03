const constants = require('../constants');
const buildLicenseKey = require('../utilities/license-key-builder');

const createLicense = (z, bundle) => {
    const promise = z.request({
        url: `${constants.CRYPTLEX_API}/licenses`,
        method: 'POST',
        body: JSON.stringify({
                productId: bundle.inputData.productId,
                key: buildLicenseKey(bundle.inputData.userId)
            })
    });

    return promise.then((response) => JSON.parse(response.content));
}

module.exports = {
    key: 'license_create',
    noun: 'License',
    display: {
        label: 'Create License',
        description: 'Creates a new Cryptlex license.'
    },

    operation: {
        inputFields: [
            {
                key: 'productId',
                required: true,
                helpText: 'The product ID for which a license will be created'
            },
            {
                key: 'userId',
                required: true,
                label: 'User ID'
            }
        ],
        perform: createLicense
    }
};