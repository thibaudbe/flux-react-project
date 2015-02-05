'use strict';

var keyMirror = require('keymirror');


module.exports = {
  ActionTypes : keyMirror({
    LOAD_DATA: null,
    LOAD_SUCCESS: null,
    LOAD_ERROR: null
  })
};
