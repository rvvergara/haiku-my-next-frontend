/*
  Do not copy/paste this file. It is used internally
  to manage end-to-end test suites.
*/

const NextI18Next = require('next-i18next').default;
// require('next/config').setConfig(require('./next.config'));
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;

const localeSubpathVariations = {
  none: {},
  foreign: {
    id: 'id',
  },
  all: {
    en: 'en',
    id: 'id',
  },
};

module.exports = new NextI18Next({
  otherLanguages: ['id'],
  localeSubpaths: localeSubpathVariations[localeSubpaths],
});
