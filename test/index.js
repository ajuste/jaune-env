const lib    = require("../");
const assert = require("assert");

describe("environment", function() {
  describe("initEnv", function(){
    it ("sets configuration", function(){
      lib.initEnv({
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
      assert.equal(undefined, lib.getEnvProperty("prop"));
    });
    it ("gets undefined for non existing property in section", function(){
      assert.equal(undefined, lib.getEnvProperty("section2", "prop"));
    });
    it ("gets undefined for non existing property in nested section", function(){
      assert.equal(undefined, lib.getEnvProperty("section1.section2", "prop"));
    });
    it ("gets correct value for nested and existing", function(){
      assert.equal("hi", lib.getEnvProperty("section1.section11", "data"));
    });
  });
});
