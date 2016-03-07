###*
* @file   Source file for environment configuration.
* @author Alvaro Juste
###
"use strict"

###*
* @constant Process property name for environment type
###
ENV_TYPE               = "type";

###*
* @constant Development process type name
###
ENV_TYPE_DEV           = "development";

###*
* @constant production process type name
###
ENV_TYPE_PROD          = "production";

###*
* @constant Postfix for connections name in develop mode.
###
CONFIG_DEV_POST        = "Develop";

class Environment

  constructor: (@config) ->

  ###*
  * @function Gets section or key within a section. Tries to get
  *           _config based on environtment or generic.
  * @param    {String} section The section name
  * @param    {String} [property] The property name
  * @returns  {*}      Data or undefined
  ###
  getEnvProperty: ->

    [section, property] = arguments
    data = null;

    return unless @config and section

    @determineEnv()

    index = 0
    sections = section.split('.')
    length = sections.length

    data = (data ? @config)[sections[index++]] while index < length and data? or index is 0
    data = data["#{property}#{this.envPost}"] ? data[property] if arguments.length >= 2 and data?

    data

  ###*
  * @function Sets process property
  * @param    {String} key The key
  * @param    {String} value The value
  ###
  setProcessProperty : (key, value) ->
    throw new Error 'key must be a string' if 'string' isnt typeof key
    throw new Error 'value must be a string' if 'string' isnt typeof value
    (process.jaune ? (process.jaune = {}))[key] = value

  ###*
  * @function Gets process property
  * @param    {String} key The key
  * @param    {String} def Default value
  ###
  getProcessProperty : (key, def) ->
    throw new Error 'key must be a string' if 'string' isnt typeof key
    (process.jaune ? (process.jaune = {}))[key] ? def

  ###*
  * @function Determines environment
  ###
  determineEnv = () ->
    return if 'string' is typeof this.isDevelop

    @envType = @getProcessProperty(ENV_TYPE) is ENV_TYPE_DEV ? ENV_TYPE_DEV : ENV_TYPE_PROD
    @envPost = @getProcessProperty(ENV_TYPE) is ENV_TYPE_DEV ? CONFIG_DEV_POST : ""


module.exports = Environment;
