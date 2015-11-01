const lib    = require("../");
const assert = require("assert");

var _env = null;

describe("environment", function() {
  describe("initEnv", function(){
    it ("sets configuration", function(){
      _env = new lib({
        section1 : {
          section11 :{
            data : "hi"
          }
        }
      });
    });
  });
  describe("getEnvProperty", function(){
    it ("gets undefined for non existing property", function(){
      assert.equal(undefined, _env.getEnvProperty("prop"));
    });
    it ("gets undefined for non existing property in section", function(){
      assert.equal(undefined, _env.getEnvProperty("section2", "prop"));
    });
    it ("gets undefined for non existing property in nested section", function(){
      assert.equal(undefined, _env.getEnvProperty("section1.section2", "prop"));
    });
    it ("gets correct value for nested and existing", function(){
      assert.equal("hi", _env.getEnvProperty("section1.section11", "data"));
    });
  });
});
