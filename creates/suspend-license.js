const zapier = require('zapier-platform-core');
zapier.tools.env.inject();

const suspendLicense = (z, bundle) => {
    let licenseKey = buildLicenseKey(bundle.inputData.userId);
    const promise = z.request({
        url: `${process.env.CRYPTLEX_API}/licenses/${licenseKey}`,
        method: 'POST',
        body: JSON.stringify({
            })
    });

    return promise.then((response) => JSON.parse(response.content));
}

const buildLicenseKey = (input) => {
    return `${input}_${input}`;
}

module.exports = {
    key: 'license_suspend',
    noun: 'License',
    display: {
        label: 'Suspend License',
        description: 'Suspends a Cryptlex license.'
    },

    operation: {
        inputFields: [
            {
                key: 'userId',
                required: true,
                label: 'User ID',
                helpText: 'The user ID for the license to suspend'
            }
        ],
        perform: suspendLicense
    }
}