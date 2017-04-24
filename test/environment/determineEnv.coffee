lib = require '../../'
{
  equal
} = require 'assert'

describe 'environment', ->
  describe 'determineEnv', ->

    context 'in dev implicit', ->

      before ->
        @env = new lib().determineEnv()

      after ->
        @env = null

      it 'sets right flags for prod', ->
        equal "dev", @env.envType
        equal "-dev", @env.envPost

    context 'in dev explicit', ->

      before ->
        process.env = env: 'dev'
        @env = new lib().determineEnv()

      after ->
        process.env.env = null
        @env = null

      it 'sets right flags for prod', ->
        equal "dev", @env.envType
        equal "-dev", @env.envPost

    context 'in prod', ->

      before ->
        process.env = env: 'prod'
        @env = new lib().determineEnv()

      after ->
        process.env.env = null
        @env = null

      it 'sets right flags for prod', ->
        equal "prod", @env.envType
        equal "", @env.envPost

    context 'in prod from jaune', ->

      before ->
        process.jaune = env: 'prod'
        @env = new lib().determineEnv()

      after ->
        process.jaune.env = null
        @env = null

      it 'sets right flags for prod', ->
        equal "prod", @env.envType
        equal "", @env.envPost
