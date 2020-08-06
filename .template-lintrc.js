'use strict';

module.exports = {
  extends: 'octane',
  rules: {
    'no-implicit-this': {
      allow: ['_'] // required by ember-set-helper
    },
  },
};
