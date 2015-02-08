'use strict';

var React = require('react');
var Navbar         = require('../partials/Navbar.jsx');
var Footer         = require('../partials/Footer.jsx');

var NotFound = React.createClass({

	render: function() {
		return (
			<div className="error-page page error-404">

				<Navbar />

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