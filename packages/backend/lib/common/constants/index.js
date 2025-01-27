"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supported_langs = exports.passwordRegex = exports.nicknameRegex = exports.lang_variants = exports.errorCodes = exports.default_lang = void 0;
var nicknameRegex = exports.nicknameRegex = /^[a-zA-Z0-9]{6,}$/;
var passwordRegex = exports.passwordRegex = /^(?=.*\d)(?=[a-zA-Z0-9]{8,}$).+$/;
var errorCodes = exports.errorCodes = Object.freeze({
  alreadyExists: 409,
  accessDenied: 403,
  dataNotFounded: 400,
  invalidToken: 401,
  nicknamePasswordRequired: 400,
  nicknameTaken: 409,
  passwordsNotMatch: 400,
  serverError: 500,
  userNotFoundedOrWrongCredentials: 401,
  wrongCredentialsRegistration: 422,
  wrongWishData: 422
});
var lang_variants = exports.lang_variants = Object.freeze({
  'en': 'us',
  'en-US': 'us',
  'en-GB': 'us',
  'en-AU': 'us',
  'en-CA': 'us',
  'en-NZ': 'us',
  'en-IN': 'us',
  'en-SG': 'us',
  'en-ZA': 'us',
  'en-IE': 'us',
  'en-PH': 'us',
  'US': 'us',
  'GB': 'us',
  'AU': 'us',
  'CA': 'us',
  'NZ': 'us',
  'IN': 'us',
  'SG': 'us',
  'ZA': 'us',
  'IE': 'us',
  'PH': 'us',
  'us': 'us',
  'gb': 'us',
  'au': 'us',
  'ca': 'us',
  'nz': 'us',
  'in': 'us',
  'sg': 'us',
  'za': 'us',
  'ie': 'us',
  'ph': 'us',
  'uk': 'ua',
  'ua': 'ua',
  'uk-UA': 'ua',
  'UA': 'ua'
});
var default_lang = exports.default_lang = 'us';
var supported_langs = exports.supported_langs = Object.keys(lang_variants);