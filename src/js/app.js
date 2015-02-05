'use strict';

var React         = require('react');
window.React      = React;
var routes        = require('./routes');
var App           = require('./components/App.jsx');

var Router        = require('react-router');

// Router.HistoryLocation, 
Router.run(routes, function(Handler, state) {
  React.render(
    <Handler params={state.params}/>, 
    document.getElementById('view')
  );
});
