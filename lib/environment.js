/**
 * @file   Source file for environment registration.
 * @author Alvaro Juste
 */
"use strict";

let   _config  = null;
const _envType = process.env.type;

module.exports = {
  /**
   * @function Gets section or key within a section. Tries to get
   *           _config based on environtment or generic.
   * @param    {String} section The section name
   * @param    {String} [property] The property name
   * @returns  {*}      Data or undefined
   */
  getEnvProperty : function() {

    var section  = arguments[0];
    var property = arguments[1];
    var data     = null;

    if (!_config || !section) return undefined;


    for(var _i = 0, _s = section.split('.'), _l = _s.length; _i < _l && (data || _i == 0); _i++) {
      data = (data || _config)[_s[_i]];
    }
    if (arguments.length >= 2) {
      (data || (data = {}));
      data = data[`${_envType}${property}`] || data[property];
    }
    return data;
  },
  initEnv : function(config) {
    return _config = config;
  }
};
