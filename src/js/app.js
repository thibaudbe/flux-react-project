'use strict';

var React         = require('react');
window.React      = React;
var routes        = require('./routes');
var App           = require('./components/App.jsx');
// var loadingEvents  = require('./mixins/LoadEvents');

var Router        = require('react-router');

// Router.HistoryLocation, 
Router.run(routes, function(Handler, state) {
  React.render(
    <Handler {...state} />, 
    document.body
  );
});
