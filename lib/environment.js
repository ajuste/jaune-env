
/**
* @file   Source file for environment configuration.
* @author Alvaro Juste
 */
"use strict";
var ENV_TYPE, ENV_TYPE_DEV, ENV_TYPE_PROD, EnvFiles, Environment, MatchNonWord, existsSync, join, readFileSync, ref;

join = require('path').join;

ref = require('fs'), existsSync = ref.existsSync, readFileSync = ref.readFileSync;


/**
* @constant Process property name for environment type
 */

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

EnvFiles = ['.env', 'env', 'env.json', '.config', 'config', 'config.json'];

Environment = (function() {
  function Environment(config) {
    var f, i, len;
    this.config = config;
    if (this.config) {
      return;
    }
    for (i = 0, len = EnvFiles.length; i < len; i++) {
      f = EnvFiles[i];
      if (existsSync(f)) {
        this.config = JSON.parse(readFileSync(join(process.cwd(), f)));
        break;
      }
    }
  }

  Environment.prototype.transformKey = function(key) {
    return key.replace(MatchNonWord, '_');
  };

  Environment.prototype.parseValue = function(value) {
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
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
    var current, data, index, length, proc, property, ref1, ref2, section, sections;
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
      data = (ref1 = current["" + section + this.envPost]) != null ? ref1 : current[section];
    }
    if (arguments.length >= 2 && (data != null)) {
      data = (ref2 = data["" + property + this.envPost]) != null ? ref2 : data[property];
    }
    return this.parseValue(data);
  };


  /**
  * @function Sets process property
  * @param    {String} key The key
  * @param    {String} value The value
  * @returns  {Object} Self
   */

  Environment.prototype.setProcessProperty = function(key, value) {
    var ref1;
    if ('string' !== typeof key) {
      throw new Error('key must be a string');
    }
    if ('string' !== typeof value) {
      throw new Error('value must be a string');
    }
    ((ref1 = process.jaune) != null ? ref1 : (process.jaune = {}))[key] = value;
    return this;
  };


  /**
  * @function Gets process property
  * @param    {String} key The key
  * @param    {String} def Default value
   */

  Environment.prototype.getProcessProperty = function(key, def) {
    var ref1, ref2, ref3, ref4;
    if ('string' !== typeof key) {
      throw new Error('key must be a string');
    }
    return this.parseValue((ref1 = (ref2 = (ref3 = process.env[this.transformKey(key)]) != null ? ref3 : process.env[key]) != null ? ref2 : ((ref4 = process.jaune) != null ? ref4 : (process.jaune = {}))[key]) != null ? ref1 : def);
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
