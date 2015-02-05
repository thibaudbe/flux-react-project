'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher.js');
var ActionTypes 	= require('../constants/ActionTypes.js').ActionTypes;
var API           = require('../utils/API');


var AppActions = {

	getList: function(id) {
		console.log('=> Actions => API :', id);
		API.getList(id);
	},

	getShot: function(id) {
		console.log('=> Actions => API :', id);
		API.getShot(id);
	},

	getPlayer: function(id) {
		console.log('=> Actions => API :', id);
		API.getPlayer(id);
	},

};


module.exports = AppActions;
