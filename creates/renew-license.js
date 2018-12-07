const constants = require('../constants');
const utils = require('../utils');

const renewLicense = (z, bundle) => {
    let licenseKey = utils.buildLicenseKey(bundle.inputData.userId);

    const licenseIdPromise = utils.getLicenseId(licenseKey, z);

    return licenseIdPromise.then((response) => {
        let licenseIdResult = JSON.parse(response.content);
        let licenseId = licenseIdResult[0].id;

        return z.request({
            url: `${constants.CRYPTLEX_API}/licenses/${licenseId}/renew`,
            method: 'POST'
            })
            .then((response) => JSON.parse(response.content));
    });
};

module.exports = {
    key: 'license_renew',
    noun: 'License',
    display: {
        label: 'Renew License',
        description: 'Renews a Cryptlex license.'
    },

    operation: {
        inputFields: [
            {
                key: 'userId',
                required: true,
                label: 'User ID',
                helpText: 'The user ID for the license to renew'
            }
        ],
        perform: renewLicense
    }
}