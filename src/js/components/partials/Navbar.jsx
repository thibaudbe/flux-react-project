'use strict';

var React         = require('react');
var AppStore      = require('../../stores/AppStore');


var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;


var NavBar = React.createClass({

	getInitialState: function() {
		return AppStore.getState();
	},

	componentDidMount: function() {
		AppStore.addChangeListener(this._onStoreChange);
	},

	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onStoreChange);
	},

	toggleMenu: function(event) {
		this.setState({
			open: !this.state.open
		});
	},

	/**
	 * @return {object}
	 */
	render: function() {
		var openClass = this.state.open ? 'show-menu' : '';

		return (
			<div id="header" role="navigation" className={openClass}>
				<div className="menu">
					<nav className="menu__inner">
						<div className="menu__items">
							<Link to="app"><span>Home</span></Link>
							<Link to="list" params={{id: 'popular'}}><span>Popular</span></Link>
							<Link to="list" params={{id: 'everyone'}}><span>Everyone</span></Link>
							<Link to="list" params={{id: 'debuts'}}><span>Debuts</span></Link>
						</div>
					</nav>
					<button className="menu__close-button" id="closeButton" onClick={this.toggleMenu}>Close Menu</button>
				</div>
				<div className="bg" onClick={this.toggleMenu}></div>
				<button className="menu__open-button" id="openButton" onClick={this.toggleMenu}>Open Menu</button>
			</div>
		);
	},

	/**
	 * Update component when Store change
	 */
	_onStoreChange: function() {
		this.setState(AppStore.getState());
	}

});

module.exports = NavBar;

