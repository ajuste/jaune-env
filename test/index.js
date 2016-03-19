const lib    = require('../');
const assert = require('assert');

var _env = null;

describe('environment', function() {
  describe('initEnv', function() {
    it ('sets configuration', function(){
      _env = new lib({
        section1 : {
          section11 :{
            data : 'hi'
          }
        },
        section1Debug : {
          foo: true
        }
      });
    });
  });
  describe('getEnvProperty', function(){
    it ('gets undefined for non existing property', function(){
      assert.equal(undefined, _env.getEnvProperty('prop'));
    });
    it ('gets undefined for non existing property in section', function(){
      assert.equal(undefined, _env.getEnvProperty('section2', 'prop'));
    });
    it ('gets undefined for non existing property in nested section', function(){
      assert.equal(undefined, _env.getEnvProperty('section1.section2', 'prop'));
    });
    it ('gets correct value for nested and existing', function(){
      assert.equal('hi', _env.getEnvProperty('section1.section11', 'data'));
    });
  });

  describe('getEnvProperty on development', function(){
    before(function() {
      process.jaune = {type: 'development'}
      _env = new lib({
        section1 : {
          foo: false
        },
        section1Develop : {
          foo: true,
          section11 : {
            foo: false
          },
          section11Develop : {
            foo: true
          },
          section12 : {
            foo: false
          },
          section13 : {
            fooDevelop: true
          }
        }
      });
    });
    after(function() {
      process.jaune = {};
    });
    it ('gets value when section has only 1 step', function(){
      assert.equal(true, _env.getEnvProperty('section1', 'foo'));
    });
    it ('gets value when section has only 2 steps', function(){
      assert.equal(true, _env.getEnvProperty('section1.section11', 'foo'));
    });
    it ('gets value when section has only 2 steps no develop on last step', function(){
      assert.equal(false, _env.getEnvProperty('section1.section12', 'foo'));
    });
    it ('gets value when section has only 2 steps with develop on last step', function(){
      assert.equal(true, _env.getEnvProperty('section1.section13', 'foo'));
    });
  });
});
