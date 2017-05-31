lib = require '../../'
{
  equal
  deepEqual
} = require 'assert'

{
  unlinkSync
  writeFileSync
} = require 'fs'

{
  join
} = require 'path'

EnvFiles = [
  '.env'
  'env'
  'env.json'
  '.config'
  'config'
  'config.json'
]

describe 'environment', ->

  describe 'constructor', ->

    EnvFiles.forEach (f) ->

      context "using #{f} as config file", ->

        before ->
          writeFileSync join(process.cwd(), f),
            JSON.stringify val: "this is #{f} file config"
          @env = new lib()

        after ->
          unlinkSync f
          @env = null

        it "should use #{f} config file", ->
          deepEqual @env.config, val: "this is #{f} file config"
