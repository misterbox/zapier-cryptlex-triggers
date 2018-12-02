'use strict';

module.exports = (request, z, bundle) => {
    request.headers['Content-Type'] = 'application/json';
    request.headers['accept'] = ['application/json'];

    return request;
}