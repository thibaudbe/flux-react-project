'use strict';

var React         = require('react');

var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;


var Navbar = React.createClass({

	getInitialState: function() {
		return {
			menu: false
		}
	},

	toggleMenu: function(event) {
		this.setState({
			menu: !this.state.menu
		});
	},

	/**
	 * @return {object}
	 */
	render: function() {
		var menuClass = this.state.menu ? 'show-menu' : '';

		return (
			<div id="navigation" role="navigation" className={menuClass}>
				<div className="menu">
					<nav className="menu__inner">
						<div className="menu__title">
							<Link onClick={this.toggleMenu} to="app">RRReact</Link>
						</div>
						<div className="menu__items">
							<Link onClick={this.toggleMenu} to="list" params={{id: 'popular'}}>Popular</Link>
							<Link onClick={this.toggleMenu} to="list" params={{id: 'everyone'}}>Everyone</Link>
							<Link onClick={this.toggleMenu} to="list" params={{id: 'debuts'}}>Debuts</Link>
							<a onClick={this.toggleMenu} href="#/error">Error</a>
						</div>
					</nav>
					<button className="menu__close-button" id="closeButton" onClick={this.toggleMenu}>
						<i className="fa fa-close"></i>
					</button>
				</div>
				<button className="menu__open-button animated moveDown" id="openButton" onClick={this.toggleMenu}>
					<i className="fa fa-bars"></i>
				</button>
				<div className="bg" onClick={this.toggleMenu}></div>
			</div>
		);
	}

});

module.exports = Navbar;

