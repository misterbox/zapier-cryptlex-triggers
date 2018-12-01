const license = require('./creates/license');

const auth = {
  type: 'custom',
  test: {
    url: 'https://api.cryptlex.com/v3/me'
  },
  fields: [
    {
      key: 'api_key',
      type: 'string',
      required: true,
      helpText: 'Created under Api > Personal Access Tokens'
    }
  ]
}

const addApiKeyToHeader = (request, z, bundle) => {
  request.headers.Authorization = `Bearer ${bundle.authData.api_key}`;

  return request;
}

// Now we can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: auth,

  beforeRequest: [
    addApiKeyToHeader
  ],

  afterResponse: [
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
    [license.key]: license
  }
};

// Finally, export the app.
module.exports = App;
