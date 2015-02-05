'use strict';

var React = require('react');

var NotFound = React.createClass({

  render: function() {
    return (
      <div>
        <h1>404</h1>
        <p>Page not found.</p>
      </div>
    );
  }

});

module.exports = NotFound;