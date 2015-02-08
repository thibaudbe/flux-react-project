'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppActions    = require('../actions/AppActions');
var ActionTypes 	= require('../constants/ActionTypes');
var API      			= require('../utils/API');

var EventEmitter 	= require('events').EventEmitter;
var assign 				= require('object-assign');

var CHANGE_EVENT = 'change';

var _state = {
	loading: false,
	viewport: {
		top: 0,
		height: 0
	},
	id: null,
	data: []
};

function setData(id, data) {
	_state.id = id;
  _state.data = data;
}

var AppStore = assign({}, EventEmitter.prototype, {

	/**
	 * Get the entire collection of data & id.
	 * @return {object}
	 */
	getState: function() {
		return _state;
	},

	find: function(filter) {
		// query
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	loadingEvents: function() {
		this.emit(CHANGE_EVENT);
	}
	
});


/**
 * Register all callback to handle all updates
 * In destination to AppDispatcher
 */
AppStore.dispatchToken = AppDispatcher.register(function(payload) {

	/**
	 * Actions from handleServerAction
	 */
	var action = payload.action;
	var id = payload.action.id;
	var data = payload.action.data;
	console.log('=> Dispatcher => Store :', action);

	switch(action.type) {
		case ActionTypes.LOAD_DATA:
			console.log('=> Store => View :', action);
			setData(id, data);
			break;

		case ActionTypes.LOAD_ERROR:
			console.log('=> Store => View :', action);
			setData(id, data);
			break;

		default:
			break;
	}
	AppStore.emitChange();

	return true;
});


module.exports = AppStore;