'use strict';

var React 				= require('react');
var AppStore 			= require('../stores/AppStore');
var AppActions    = require('../actions/AppActions');
var Navbar        = require('../components/partials/Navbar.jsx');

var DocumentTitle	= require('react-document-title');
var Router 				= require('react-router');
var RouteHandler 	= Router.RouteHandler;
var Link 					= Router.Link;


var App = React.createClass({
	
	/**
	 * @return {object}
	 */
	render: function() {
		
		return (
			<DocumentTitle title={'App | '+ this.props.params.id || 'Untitled'}>
				<div className='App'>
					<Navbar />
					<hr/>
					<hr/>
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
