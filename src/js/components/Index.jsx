'use strict';

var React 				 = require('react');

var DocumentTitle  = require('react-document-title');
var Router         = require('react-router');
var RouteHandler   = Router.RouteHandler;
var Link           = Router.Link;


var Index = React.createClass({

	/**
	 * @return {object}
	 */
	render: function() {
		return (
			<DocumentTitle title='App'>
				<div>
					<h2><Link to="list" params={{id: 'popular'}}>Popular</Link></h2>
					<h2><Link to="list" params={{id: 'everyone'}}>Everyone</Link></h2>
					<h2><Link to="list" params={{id: 'debuts'}}>Debuts</Link></h2>
				</div>
			</DocumentTitle>
		);
	}

});

module.exports = Index;