###*
* @file   Source file for environment configuration.
* @author Alvaro Juste
###
"use strict"

###*
* @constant Process property name for environment type
###
ENV_TYPE = "env"

###*
* @constant Development process type name
###
ENV_TYPE_DEV = "dev"

###*
* @constant production process type name
###
ENV_TYPE_PROD = "prod"

class Environment

  constructor: (@config) ->

  ###*
  * @function Gets section or key within a section. Tries to get
  *           _config based on environtment or generic. But first tries to
  *           get it from environment variable.
  * @param    {String} section The section name
  * @param    {String} [property] The property name
  * @returns  {*}      Data or undefined
  ###
  getEnvProperty: ->

    [section, property] = arguments
    data = null

    return unless section

    return proc if (proc = @getProcessProperty(
      "#{section}#{if property? then '.' + property else ''}"))?


    return unless @config

    @determineEnv()

    index = 0
    sections = section.split('.')
    {length} = sections

    while index < length and data? or index is 0
      current = data ? @config
      section = sections[index++]
      data = current["#{section}#{@envPost}"] ? current[section]

    if arguments.length >= 2 and data?
      data = data["#{property}#{@envPost}"] ? data[property]

    data

  ###*
  * @function Sets process property
  * @param    {String} key The key
  * @param    {String} value The value
  * @returns  {Object} Self
  ###
  setProcessProperty : (key, value) ->
    throw new Error 'key must be a string' if 'string' isnt typeof key
    throw new Error 'value must be a string' if 'string' isnt typeof value
    (process.jaune ? (process.jaune = {}))[key] = value

    return this

  ###*
  * @function Gets process property
  * @param    {String} key The key
  * @param    {String} def Default value
  ###
  getProcessProperty : (key, def) ->
    throw new Error 'key must be a string' if 'string' isnt typeof key
    return val if (val = process.env[key])?
    (process.jaune ? (process.jaune = {}))[key] ? def

  ###*
  * @function Determines environment
  * @returns  {Object} Returns self reference
  ###
  determineEnv : () ->
    return if 'string' is typeof this.isDevelop

    @envType = @getProcessProperty(ENV_TYPE)

    @envType = ENV_TYPE_DEV if not @envType
    @envPost = unless @envType is ENV_TYPE_PROD then "-#{@envType}" else ''

    this

module.exports = Environment
