'use strict';

var React         = require('react');

var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;


var Footer = React.createClass({

	/**
	 * @return {object}
	 */
	render: function() {
		var year = new Date().getFullYear();

		return (
			<div className="footer animated moveUp">
				<div className="container">
					<div className="footer__inner">
						<div className="col-6">
							<p>© RRReact {year}. MIT licensed.</p>
						</div>
						<div className="col-6">
							<p className="text-right">
								<a href="https://github.com/thibaudbe/flux-react-project" target="_blank">More about this project</a>
								&nbsp;by&nbsp;
								<a href="http://thibaudb.com" target="_blank">Thibaud B.</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		);

	},

});

module.exports = Footer;

