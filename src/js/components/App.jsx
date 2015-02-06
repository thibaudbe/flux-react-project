'use strict';

var React 				= require('react');
var AppStore 			= require('../stores/AppStore');
var AppActions    = require('../actions/AppActions');
var Navbar        = require('./partials/Navbar.jsx');

var DocumentTitle	= require('react-document-title');
var Router 				= require('react-router');
var RouteHandler 	= Router.RouteHandler;
var Link 					= Router.Link;


var App = React.createClass({
	
	lettrine: function (str) {
		return isNaN(str) ? str.charAt(0).toUpperCase() + str.slice(1) : str;
	},

	/**
	 * @return {object}
	 */
	render: function() {
		var id = this.props.params.id ? this.lettrine(this.props.params.id) : '';
		var nav = this.props.params.id ? <Navbar /> : '';

		return (
			<DocumentTitle title={'App | '+ id || 'Untitled'}>
				<div className='App'>
					{nav}
					<RouteHandler {...this.props.params} />
				</div>
			</DocumentTitle>
		);
	},

	/**
	 * Update component when Store change
	 */
	_onStoreChange: function() {
		this.setState(AppStore.getState());
	}

});

module.exports = App;
