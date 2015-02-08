'use strict';

var React 				 = require('react');
var Footer         = require('../partials/Footer.jsx');

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
			<DocumentTitle title="RRReact">
				<div className="home-page page">
					<div className="logo animated moveDown">
						<h1>R</h1>
					</div>
					<ul className="home__title">
						<li><Link to="list" params={{id: 'popular'}}>
							<span className="animated zoomIn">Popular</span></Link>
						</li>
						<li><Link to="list" params={{id: 'everyone'}}>
							<span className="animated zoomIn">Everyone</span></Link>
						</li>
						<li><Link to="list" params={{id: 'debuts'}}>
							<span className="animated zoomIn">Debuts</span></Link>
						</li>
					</ul>
					<Footer />
				</div>
			</DocumentTitle>
		);
	}

});

module.exports = Index;