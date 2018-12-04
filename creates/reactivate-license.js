const constants = require('../constants');
const utils = require('../utils');

const reactivateLicense = (z, bundle) => {
    let licenseKey = utils.buildLicenseKey(bundle.inputData.userId);

    const licenseIdPromise = utils.getLicenseId(licenseKey, z);

    return licenseIdPromise.then((response) => {
        let licenseIdResult = JSON.parse(response.content);
        let licenseId = licenseIdResult[0].id;

        return z.request({
            url: `${constants.CRYPTLEX_API}/licenses/${licenseId}`,
            method: 'PATCH',
            body: JSON.stringify({
                    suspended: false
                })
            })
            .then((suspendResponse) => JSON.parse(suspendResponse.content));
    });
};

module.exports = {
    key: 'license_reactivate',
    noun: 'License',
    display: {
        label: 'Reactivate License',
        description: 'Reactivates a suspended Cryptlex license.'
    },

    operation: {
        inputFields: [
            {
                key: 'userId',
                required: true,
                label: 'User ID',
                helpText: 'The user ID for the license to reactivate'
            }
        ],
        perform: reactivateLicense
    }
}