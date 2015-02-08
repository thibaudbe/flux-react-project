'use strict';

var React = require('react');
var Footer         = require('../partials/Footer.jsx');

var NotFound = React.createClass({

	render: function() {
		return (
			<div className="error-page error-404">
				<div className="error__inner">
					<h1>404</h1>
					<p>Page not found.</p>
				</div>
				<Footer />
			</div>
		);
	}

});

module.exports = NotFound;