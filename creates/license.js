const createLicense = (z, bundle) => {
    const promise = z.request({
        url: 'https://api.cryptlex.com/v3/licenses',
        method: 'POST',
        body: JSON.stringify({
            productId: bundle.inputData.productId,
            key: buildLicenseKey(bundle.inputData.userId)
        }),
        headers: {
            'Content-Type': 'application/json',
            'accept': ['application/json']
        }
    });

    return promise.then((response) => JSON.parse(response.content));
}

const buildLicenseKey = (input) => {
    return `${input}_${input}`;
}

module.exports = {
    key: 'license',
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
                type: 'string',
                helpText: 'The product ID for which a license will be created'
            },
            {
                key: 'userId',
                required: true,
                type: 'string',
                label: 'User ID'
            }
        ],
        perform: createLicense
    }
};