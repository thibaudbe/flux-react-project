'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher.js');
var ActionTypes 	= require('../constants/ActionTypes.js').ActionTypes;
var API           = require('../utils/API');


var AppActions = {

	getList: function(id) {
		console.log('=> Actions => API :', id);
		API.getList(id);
	},

	getItem: function(id) {
		console.log('=> Actions => API :', id);
		API.getItem(id);
	},

	getUser: function(id) {
		console.log('=> Actions => API :', id);
		API.getUser(id);
	},

};


module.exports = AppActions;
