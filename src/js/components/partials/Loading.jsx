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
					<i className="fa fa-spinner fa-spin"></i>
				</div>
			</div>
		);

	},

});

module.exports = Loading;

