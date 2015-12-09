/**
 * @file   Source file for environment registration.
 * @author Alvaro Juste
 */
"use strict";

/**
 * @constant Process property name for environment type
 */
const ENV_TYPE               = "type";

/**
 * @constant Development process type name
 */
const ENV_TYPE_DEV           = "development";

/**
 * @constant production process type name
 */
const ENV_TYPE_PROD          = "production";

/**
 * @constant Postfix for connections name in develop mode.
 */
const CONFIG_DEV_POST        = "Develop";

const Environment = function(config) {
  this.config = config;
};

/**
 * @function Gets section or key within a section. Tries to get
 *           _config based on environtment or generic.
 * @param    {String} section The section name
 * @param    {String} [property] The property name
 * @returns  {*}      Data or undefined
 */
Environment.prototype.getEnvProperty = function() {

  var section  = arguments[0];
  var property = arguments[1];
  var data     = null;

  if (!this.config || !section) return undefined;

  this.determineEnv();

  for(var _i = 0, _s = section.split('.'), _l = _s.length; _i < _l && (data || _i == 0); _i++) {
    data = (data || this.config)[_s[_i]];
  }
  if (arguments.length >= 2) {
    (data || (data = {}));
    data = data[`${property}${this.envType}`] || data[property];
  }
  return data;
};

/**
 * @function Sets process property
 * @param    {String} key The key
 * @param    {String} value The value
 */
Environment.prototype.setProcessProperty = function(key, value) {
  if ('string' !== typeof key) {
    throw new Error('key must be a string');
  }
  if ('string' !== typeof value) {
    throw new Error('value must be a string');
  }
  (process.jaune || (process.jaune = {}))[key] = value;
}

/**
 * @function Gets process property
 * @param    {String} key The key
 * @param    {String} def Default value
 */
Environment.prototype.getProcessProperty = function(key, def) {
  if ('string' !== typeof key) {
    throw new Error('key must be a string');
  }
  return (process.jaune || (process.jaune = {}))[key] || def
}

/**
 * @function Determines environment
 */
Environment.prototype.determineEnv = function() {
  if ('string' === typeof this.isDevelop) return;
  this.envType = this.getProcessProperty(ENV_TYPE) === ENV_TYPE_DEV ? ENV_TYPE_DEV : ENV_TYPE_PROD;
};

module.exports = Environment;
