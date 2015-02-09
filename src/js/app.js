'use strict';

var React         = require('react');
window.React      = React;
var routes        = require('./routes');
var App           = require('./components/App.jsx');
var loadingEvents  = require('./mixins/LoadEvents');

var Router        = require('react-router');

// Router.HistoryLocation, 
Router.run(routes, function(Handler, state) {
	// loadingEvents.emit('loadStart');
  React.render(
    <Handler params={state.params}/>, 
    document.body
  );
});
