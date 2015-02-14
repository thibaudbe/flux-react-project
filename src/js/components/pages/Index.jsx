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
			<DocumentTitle title="RRReact">
				<div className="page home-page">
					<ul className="home__title container">
						<li>
							<Link to="list" params={{id: 'popular'}}>
								<span className="animated zoomIn">
									<span className="title">Popular</span>
									<span className="desc">Popular shots</span>
								</span>
							</Link>
						</li>
						<li>
							<Link to="list" params={{id: 'everyone'}}>
								<span className="animated zoomIn">
									<span className="title">Everyone</span>
									<span className="desc">Last shots</span>
								</span>
							</Link>
						</li>
						<li>
							<Link to="list" params={{id: 'debuts'}}>
								<span className="animated zoomIn">
									<span className="title">Debuts</span>
									<span className="desc">First shots</span>
								</span>
							</Link>
						</li>
					</ul>
				</div>
			</DocumentTitle>
		);
	}

});

module.exports = Index;