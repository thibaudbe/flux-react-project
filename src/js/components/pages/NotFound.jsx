'use strict';

var React = require('react');

var NotFound = React.createClass({

	render: function() {
		return (
			<div className="error error-404">
				<div className="error__inner">
					<h1>404</h1>
					<p>Page not found.</p>
				</div>
			</div>
		);
	}

});

module.exports = NotFound;