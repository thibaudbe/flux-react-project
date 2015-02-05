'use strict';

var AppStore 			= require('../stores/AppStore');
var AppActions    = require('../actions/AppActions');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var ActionTypes   = require('../constants/ActionTypes').ActionTypes;

var $       = require('jquery');
var API_URL = 'https://api.dribbble.com';


function makeUrl(part) {
	return API_URL + part;
}

function dispatch(key, id, data) {
	var payload = {
		type: key, 
		data: data, 
		id: id
	};
	AppDispatcher.handleServerAction(payload);
}

function get(url, key, id) {

	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		data: {},
		url: url,
		beforeSend: function() {},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('=> API (Store) => Actions : ERROR', textStatus);
			var msg = {message: '404, NotFound'};
			var key = ActionTypes.LOAD_ERROR;
			var id = 'error';
			dispatch(key, id, msg);
		},
		success: function(data) {
			console.log('=> API (Store) => Actions : OK');
			dispatch(key, id, data);
		}
	});

}

var API = {
	getList: function(id) {
		var url = makeUrl('/shots/'+ id);
		var key = ActionTypes.LOAD_DATA;
		get(url, key, id);
	},

	getItem: function(id) {
		var url = makeUrl('/shots/'+ id);
		var key = ActionTypes.LOAD_DATA;
		get(url, key, id);
	},

	getUser: function(id) {
		var url = makeUrl('/players/'+ id +'/shots');
		var key = ActionTypes.LOAD_DATA;
		get(url, key, id);
	}
};

module.exports = API;
