
/**
* @file   Source file for environment configuration.
* @author Alvaro Juste
 */
"use strict";

/**
* @constant Process property name for environment type
 */
var ENV_TYPE, ENV_TYPE_DEV, ENV_TYPE_PROD, Environment, MatchNonWord;

ENV_TYPE = "env";


/**
* @constant Development process type name
 */

ENV_TYPE_DEV = "dev";


/**
* @constant production process type name
 */

ENV_TYPE_PROD = "prod";

MatchNonWord = /\W/g;

Environment = (function() {
  function Environment(config) {
    this.config = config;
  }

  Environment.prototype.transformKey = function(key) {
    return key.replace(MatchNonWord, '_');
  };


  /**
  * @function Gets section or key within a section. Tries to get
  *           _config based on environtment or generic. But first tries to
  *           get it from environment variable.
  * @param    {String} section The section name
  * @param    {String} [property] The property name
  * @returns  {*}      Data or undefined
   */

  Environment.prototype.getEnvProperty = function() {
    var current, data, index, length, proc, property, ref, ref1, section, sections;
    section = arguments[0], property = arguments[1];
    data = null;
    if (!section) {
      return;
    }
    if ((proc = this.getProcessProperty("" + section + (property != null ? '.' + property : ''))) != null) {
      return proc;
    }
    if (!this.config) {
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
    return data;
  };


  /**
  * @function Sets process property
  * @param    {String} key The key
  * @param    {String} value The value
  * @returns  {Object} Self
   */

  Environment.prototype.setProcessProperty = function(key, value) {
    var ref;
    if ('string' !== typeof key) {
      throw new Error('key must be a string');
    }
    if ('string' !== typeof value) {
      throw new Error('value must be a string');
    }
    ((ref = process.jaune) != null ? ref : (process.jaune = {}))[key] = value;
    return this;
  };


  /**
  * @function Gets process property
  * @param    {String} key The key
  * @param    {String} def Default value
   */

  Environment.prototype.getProcessProperty = function(key, def) {
    var ref, ref1, val;
    if ('string' !== typeof key) {
      throw new Error('key must be a string');
    }
    if ((val = process.env[this.transformKey(key)]) != null) {
      return val;
    }
    if ((val = process.env[key]) != null) {
      return val;
    }
    return (ref = ((ref1 = process.jaune) != null ? ref1 : (process.jaune = {}))[key]) != null ? ref : def;
  };


  /**
  * @function Determines environment
  * @returns  {Object} Returns self reference
   */

  Environment.prototype.determineEnv = function() {
    if ('string' === typeof this.isDevelop) {
      return;
    }
    this.envType = this.getProcessProperty(ENV_TYPE);
    if (!this.envType) {
      this.envType = ENV_TYPE_DEV;
    }
    this.envPost = this.envType !== ENV_TYPE_PROD ? "-" + this.envType : '';
    return this;
  };

  return Environment;

})();

module.exports = Environment;
