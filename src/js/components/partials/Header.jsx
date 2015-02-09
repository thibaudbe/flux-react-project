'use strict';

var React         = require('react');
var AppStore      = require('../../stores/AppStore');

var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;


var Header = React.createClass({

	renderLogo: function() {
		return (
			<Link to="app">
				<img className="logo" src="../images/logo.svg" alt="RRReact, a Flux and Reactjs project" width="30" height="30" />
			</Link>
		);
	},

	/**
	 * @return {object}
	 */
	render: function() {
		var page = this.props.page;
		var logo = page.logo ? this.renderLogo() : null;
		var classname = page.logo ? 'header is-home' : 'header';

		return (
			<header className={classname}>
				<div className="header__inner">
					{logo}
					<h1>{page.title}</h1>
				</div>
			</header>
		);
	}

});

module.exports = Header;

