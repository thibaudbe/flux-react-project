'use strict';

var React         = require('react');
var AppStore      = require('../../stores/AppStore');

var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;


var Header = React.createClass({

	/**
	 * @return {object}
	 */
	render: function() {
		return (
			<header className="header">
				<div className="header__inner">
					<h1>{this.props.title}</h1>
				</div>
			</header>
		);
	}

});

module.exports = Header;

