'use strict';

var React         = require('react');

var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;


var Loading = React.createClass({

	/**
	 * @return {object}
	 */
	render: function() {

		return (
			<div>
				<p>loading...</p>
			</div>
		);

	},

});

module.exports = Loading;

