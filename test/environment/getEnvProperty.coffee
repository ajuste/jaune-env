lib = require '../../'
{
  equal
} = require 'assert'

_env = null

describe 'environment', ->
  describe 'initEnv', ->
    it 'sets configuration', ->
      _env = new lib
        section1:
          section11:
            data: 'hi'
        section1Debug:
          foo: yes

  describe 'getEnvProperty', ->
    it 'gets undefined for non existing property', ->
      equal undefined, _env.getEnvProperty 'prop'

    it 'gets undefined for non existing property in section', ->
      equal undefined, _env.getEnvProperty 'section2', 'prop'

    it 'gets undefined for non existing property in nested section', ->
      equal undefined, _env.getEnvProperty 'section1.section2', 'prop'

    it 'gets correct value for nested and existing', ->
      equal 'hi', _env.getEnvProperty 'section1.section11', 'data'

  describe 'getEnvProperty on development', ->
    before ->
      process.jaune = env: 'dev'
      process.env['section2.foo'] = 2
      _env = new lib
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
      equal yes, _env.getEnvProperty 'section1', 'foo'

    it 'gets value when section has only 2 steps', ->
      equal yes, _env.getEnvProperty 'section1.section11', 'foo'

    it 'gets value when section has only 2 steps no develop on last step', ->
      equal no, _env.getEnvProperty 'section1.section12', 'foo'

    it 'gets value when section has only 2 steps with develop on last step', ->
      equal yes, _env.getEnvProperty 'section1.section13', 'foo'

    it 'gets value from env variables rather than config', ->
      equal 2, _env.getEnvProperty 'section2.foo'

    it 'gets value from env variables rather than config using two steps', ->
      equal 2, _env.getEnvProperty 'section2', 'foo'
