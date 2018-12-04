const constants = require('../constants');
const buildLicenseKey = require('../utilities/license-key-builder');

const getLicenseId = (licenseKey, z) => {
    return z.request({
        url: `${constants.CRYPTLEX_API}/licenses?key=${licenseKey}`,
        method: 'GET',
    })
}

const suspendLicense = (z, bundle) => {
    let licenseKey = buildLicenseKey(bundle.inputData.userId);

    const licenseIdPromise = getLicenseId(licenseKey, z);

    return licenseIdPromise.then((response) => {
        let licenseIdResult = JSON.parse(response.content);
        let licenseId = licenseIdResult[0].id;

        return z.request({
            url: `${constants.CRYPTLEX_API}/licenses/${licenseId}`,
            method: 'PATCH',
            body: JSON.stringify({
                    suspended: true
                })
            })
            .then((suspendResponse) => JSON.parse(suspendResponse.content));
    });
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