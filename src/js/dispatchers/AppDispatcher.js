'use strict';

var Dispatcher  = require('flux').Dispatcher;
var assign      = require('object-assign');

var AppDispatcher = assign(new Dispatcher(), {

	/**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the server.
   */
	handleServerAction(action) {
		console.log('=> Actions (Server) => Dispatcher :', action);

		if (!action.type)
			throw new Error('Empty action.type: you likely mistyped the action.');

		this.dispatch({
			source: 'SERVER_ACTION',
			action: action
		});
	},

	/**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the view.
   */
	handleViewAction: function(action) {
		console.log('=> Actions (View) => Dispatcher :', action);

		if (!action.type)
			throw new Error('Empty action.type: you likely mistyped the action.');
		
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		})
	}
	
});

// Dispatcher.call(AppDispatcher);
 

/*
  // oh hai, debug here
  AppDispatcher.register(function(payload){
    console.log(payload.source, 'initiated', payload.action.type)
  })
*/

module.exports = AppDispatcher;
