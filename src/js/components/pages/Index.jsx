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
		var year = new Date().getFullYear();

		return (
			<DocumentTitle title='App'>
				<div className="home">
					<ul className="home__title">
						<li><Link to="list" params={{id: 'popular'}}><span>Popular</span></Link></li>
						<li><Link to="list" params={{id: 'everyone'}}><span>Everyone</span></Link></li>
						<li><Link to="list" params={{id: 'debuts'}}><span>Debuts</span></Link></li>
					</ul>
					<footer className="home__footer">
						<div className="container">
							<div className="col-6">
								<p>© RRReact {year}. MIT licensed.</p>
							</div>
							<div className="col-6">
								<p className="text-right"><a href>More details</a> about that project by <a href="http://thibaudb.com" target="_blank">Thibaud B.</a></p>
							</div>
						</div>
					</footer>
				</div>
			</DocumentTitle>
		);
	}

});

module.exports = Index;