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
			<div className="loading">
				<div className="loading__inner">
					<p>loading...</p>
				</div>
			</div>
		);

	},

});

module.exports = Loading;

