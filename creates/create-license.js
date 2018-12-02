const zapier = require('zapier-platform-core');
zapier.tools.env.inject();

const createLicense = (z, bundle) => {
    const promise = z.request({
        url: `${process.env.CRYPTLEX_API}/licenses`,
        method: 'POST',
        body: JSON.stringify({
                productId: bundle.inputData.productId,
                key: buildLicenseKey(bundle.inputData.userId)
            })
    });

    return promise.then((response) => JSON.parse(response.content));
}

const buildLicenseKey = (input) => {
    return `${input}_${input}`;
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