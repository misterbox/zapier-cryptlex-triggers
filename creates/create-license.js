const constants = require('../constants');
const utils = require('../utils');

const createLicense = (z, bundle) => {
    const promise = z.request({
        url: `${constants.CRYPTLEX_API}/licenses`,
        method: 'POST',
        body: JSON.stringify({
                productId: bundle.inputData.productId,
                key: utils.buildLicenseKey(bundle.inputData.userId),
                metadata: [
                    {
                        required: true,
                        key: 'firstName',
                        value: `${bundle.inputData.firstName}`
                    },
                    {
                        required: true,
                        key: 'lastName',
                        value: `${bundle.inputData.lastName}`
                    },
                    {
                        required: true,
                        key: 'email',
                        value: `${bundle.inputData.email}`
                    }
                ]
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
                label: 'User ID',
                helpText: 'The ChargeBee customer ID'
            },
            {
                key: 'firstName',
                required: true,
                label: 'Customer\'s first name'
            },
            {
                key: 'lastName',
                required: true,
                label: 'Customer\'s last name'
            },
            {
                key: 'email',
                required: true,
                label: 'Customer\'s email address'
            }
        ],
        perform: createLicense
    }
};