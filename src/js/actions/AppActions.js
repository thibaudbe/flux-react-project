'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher.js');
var ActionTypes 	= require('../constants/ActionTypes.js');
var API           = require('../utils/API');


var AppActions = {

	/**
	 * @param  {string} id
	 */
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
	}

};


module.exports = AppActions;
