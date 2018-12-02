'use strict';

module.exports = {
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