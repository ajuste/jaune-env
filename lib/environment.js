
/**
* @file   Source file for environment configuration.
* @author Alvaro Juste
 */
"use strict";

/**
* @constant Process property name for environment type
 */
var CONFIG_DEV_POST, ENV_TYPE, ENV_TYPE_DEV, ENV_TYPE_PROD, Environment;

ENV_TYPE = "type";


/**
* @constant Development process type name
 */

ENV_TYPE_DEV = "development";


/**
* @constant production process type name
 */

ENV_TYPE_PROD = "production";


/**
* @constant Postfix for connections name in develop mode.
 */

CONFIG_DEV_POST = "Develop";

Environment = (function() {
  function Environment(config) {
    this.config = config;
  }


  /**
  * @function Gets section or key within a section. Tries to get
  *           _config based on environtment or generic.
  * @param    {String} section The section name
  * @param    {String} [property] The property name
  * @returns  {*}      Data or undefined
   */

  Environment.prototype.getEnvProperty = function() {
    var current, data, index, length, property, ref, ref1, section, sections;
    section = arguments[0], property = arguments[1];
    data = null;
    if (!(this.config && section)) {
      return;
    }
    this.determineEnv();
    index = 0;
    sections = section.split('.');
    length = sections.length;
    while (index < length && (data != null) || index === 0) {
      current = data != null ? data : this.config;
      section = sections[index++];
      data = (ref = current["" + section + this.envPost]) != null ? ref : current[section];
    }
    if (arguments.length >= 2 && (data != null)) {
      data = (ref1 = data["" + property + this.envPost]) != null ? ref1 : data[property];
    }
    console.log('envPost', "" + property + this.envPost);
    return data;
  };


  /**
  * @function Sets process property
  * @param    {String} key The key
  * @param    {String} value The value
   */

  Environment.prototype.setProcessProperty = function(key, value) {
    var ref;
    if ('string' !== typeof key) {
      throw new Error('key must be a string');
    }
    if ('string' !== typeof value) {
      throw new Error('value must be a string');
    }
    return ((ref = process.jaune) != null ? ref : (process.jaune = {}))[key] = value;
  };


  /**
  * @function Gets process property
  * @param    {String} key The key
  * @param    {String} def Default value
   */

  Environment.prototype.getProcessProperty = function(key, def) {
    var ref, ref1;
    if ('string' !== typeof key) {
      throw new Error('key must be a string');
    }
    return (ref = ((ref1 = process.jaune) != null ? ref1 : (process.jaune = {}))[key]) != null ? ref : def;
  };


  /**
  * @function Determines environment
   */

  Environment.prototype.determineEnv = function() {
    if ('string' === typeof this.isDevelop) {
      return;
    }
    this.envType = this.getProcessProperty(ENV_TYPE) === ENV_TYPE_DEV ? ENV_TYPE_DEV : ENV_TYPE_PROD;
    return this.envPost = this.getProcessProperty(ENV_TYPE) === ENV_TYPE_DEV ? CONFIG_DEV_POST : "";
  };

  return Environment;

})();

module.exports = Environment;
