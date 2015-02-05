'use strict';

var React         = require('react');

var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;


var NavBar = React.createClass({

	/**
	 * @return {object}
	 */
	render: function() {
		return (
			<div id="header" className="navbar navbar-default navbar-fixed-top" role="navigation">
				<div className="container">

					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link className="navbar-brand" to="app">Home</Link>
					</div>
					<div className="navbar-collapse collapse">
						<ul className="nav navbar-nav">
							<li><Link className="navbar-brand" to="list" params={{id: 'popular'}}>Popular</Link></li>
							<li><Link className="navbar-brand" to="list" params={{id: 'everyone'}}>Everyone</Link></li>
							<li><Link className="navbar-brand" to="list" params={{id: 'debuts'}}>Debuts</Link></li>
						</ul>
					</div>

				</div>
			</div>
		);
	},

});

module.exports = NavBar;

