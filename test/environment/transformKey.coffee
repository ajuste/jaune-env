lib = require '../../'
{
  equal
} = require 'assert'

describe 'environment', ->

  describe 'transformKey', ->

    before ->
      @env = new lib
        section1:
          section11:
            data: 'hi'
        section1Debug:
          foo: yes

    it 'replaces spaces', ->
      equal '__', @env.transformKey '  '

    it 'maintains numbers and letters', ->
      equal 'test123', @env.transformKey 'test123'

    it 'replaces symbols', ->
      equal '______', @env.transformKey '!@#/._'
