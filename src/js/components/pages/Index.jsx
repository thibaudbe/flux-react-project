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
				<div className="home">
					<ul className="home__title">
						<li><Link to="list" params={{id: 'popular'}}><span>Popular</span></Link></li>
						<li><Link to="list" params={{id: 'everyone'}}><span>Everyone</span></Link></li>
						<li><Link to="list" params={{id: 'debuts'}}><span>Debuts</span></Link></li>
					</ul>
				</div>
			</DocumentTitle>
		);
	}

});

module.exports = Index;