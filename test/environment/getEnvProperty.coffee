lib = require '../../'
{
  equal
  deepEqual
} = require 'assert'

env = null

describe 'environment', ->
  describe 'initEnv', ->
    it 'sets configuration', ->
      env = new lib
        section1:
          section11:
            data: 'hi'
        section1Debug:
          foo: yes

  describe 'getEnvProperty', ->
    it 'gets undefined for non existing property', ->
      equal env.getEnvProperty('prop'), undefined

    it 'gets undefined for non existing property in section', ->
      equal env.getEnvProperty('section2', 'prop'), undefined

    it 'gets undefined for non existing property in nested section', ->
      equal env.getEnvProperty('section1.section2', 'prop'), undefined

    it 'gets correct value for nested and existing', ->
      equal env.getEnvProperty('section1.section11', 'data'), 'hi'

  describe 'getEnvProperty on development', ->
    before ->
      process.jaune = env: 'dev'
      process.env['section2_foo'] = 2
      process.env['section3_foo'] = 3
      process.env['section4______foo'] = 4
      process.env['section5_foo'] = JSON.stringify a: 1, b: [3], c: d: e: f: 'a'
      env = new lib
        section1:
          foo: no
        'section1-dev':
          foo: yes,
          section11:
            foo: no
          'section11-dev':
            foo: yes
          section12:
            foo: no
          section13:
            'foo-dev': yes
        section2:
          foo: 1

    after ->
      process.jaune = {}

    it 'gets value when section has only 1 step', ->
      equal env.getEnvProperty('section1', 'foo'), yes

    it 'gets value when section has only 2 steps', ->
      equal env.getEnvProperty('section1.section11', 'foo'), yes

    it 'gets value when section has only 2 steps no develop on last step', ->
      equal env.getEnvProperty('section1.section12', 'foo'), no

    it 'gets value when section has only 2 steps with develop on last step', ->
      equal env.getEnvProperty('section1.section13', 'foo'), yes

    it 'gets value from env variables rather than config with dot replaced', ->
      equal env.getEnvProperty('section2.foo'), 2

    it 'gets value from env variables rather than config with dot', ->
      equal env.getEnvProperty('section3_foo'), 3

    it 'gets value from env variables rather than config with dot', ->
      equal env.getEnvProperty('section4 #-_{!foo'), 4

    it 'gets value from env variables which is a json', ->
      deepEqual env.getEnvProperty('section5_foo'),
        a: 1, b: [3], c: d: e: f: 'a'

    it 'gets value from env variables rather than config using two steps', ->
      equal env.getEnvProperty('section2', 'foo'), 2
