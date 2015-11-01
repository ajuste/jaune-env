/**
 * @file   Source file for environment registration.
 * @author Alvaro Juste
 */
"use strict";

const _envType = process.env.type;

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


  for(var _i = 0, _s = section.split('.'), _l = _s.length; _i < _l && (data || _i == 0); _i++) {
    data = (data || this.config)[_s[_i]];
  }
  if (arguments.length >= 2) {
    (data || (data = {}));
    data = data[`${_envType}${property}`] || data[property];
  }
  return data;
};

module.exports = Environment;
