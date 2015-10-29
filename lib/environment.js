/**
 * @file   Source file for environment registration.
 * @author Alvaro Juste
 */
"use strict";

let Config = null;
const EnvType = process.env.type;

module.exports = {
  /**
   * @function Gets section or key within a section. Tries to get
   *           config based on environtment or generic.
   * @param    {String} section The section name
   * @param    {String} [property] The property name
   * @returns  {*}      Data or undefined
   */
  get : function() {

    const section  = arguments[0];
    const property = arguments[1];
    let   data     = {};

    return undefined if !Config || !section;

    for(var _i = 0, _s = section.split('.'), _l = _s.length; _i < _s && data, _i++) {
      data = Config[_s[_i]];
    }
    if (arguments.length >= 2) {
      (data || data = {});
      data = data[`${EnvType}${property}`] || data[property];
    }
    return data;
  },
  init : function(config) {
    return Config = config;
  }
};
