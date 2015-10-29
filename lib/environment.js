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

    return undefined if !Config;

    const section  = arguments[0];
    const property = arguments[1];
    const data     = Config[section];

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
