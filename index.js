const licenseCreate = require('./creates/create-license');
const licenseSuspend = require('./creates/suspend-license');
const licenseReactivate = require('./creates/reactivate-license');
const licenseRenew = require('./creates/renew-license');
const auth = require('./authentication');
const requestMiddleware = require('./request-middleware');

const addApiKeyToHeader = (request, z, bundle) => {
  request.headers.Authorization = `Bearer ${bundle.authData.api_key}`;

  return request;
}

const handleHttpError = (response, z) => {
  if (response.status >= 400) {
    z.console.log(`Status: ${response.status}`);
    z.console.log(`Content: ${response.content}`);
    z.console.log(`Request: ${JSON.stringify(response.request)}`);
  }

  return response;
}

// Now we can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: auth,

  beforeRequest: [
    addApiKeyToHeader,
    requestMiddleware
  ],

  afterResponse: [
    handleHttpError
  ],

  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [licenseCreate.key]: licenseCreate,
    [licenseSuspend.key]: licenseSuspend,
    [licenseReactivate.key]: licenseReactivate,
    [licenseRenew.key]: licenseRenew
  }
};

// Finally, export the app.
module.exports = App;
