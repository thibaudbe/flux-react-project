'use strict';

var EventEmitter  = require('events').EventEmitter;
var loadingEvents = new EventEmitter();

module.exports = loadingEvents;

// loadingEvents.emit('loadStart');
// loadingEvents.emit('loadEnd');