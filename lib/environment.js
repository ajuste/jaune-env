/**
 * @file   Source file for environment registration.
 * @author Alvaro Juste
 */
"use strict";

let Instance = null;

module.exports = {
  get : function() {
    return Instance;
  },
  init : function(config) {
    return (Instance = config.environment);
  }
};
