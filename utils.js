'use strict';

const constants = require('./constants');

const getLicenseId = (licenseKey, z) => {
    return z.request({
        url: `${constants.CRYPTLEX_API}/licenses?key=${licenseKey}`,
        method: 'GET',
    })
};

const buildLicenseKey = (input) => {
    let uppercase = input.toUpperCase();
    return `${uppercase}_${uppercase}`;
};

module.exports = {
    getLicenseId,
    buildLicenseKey
};