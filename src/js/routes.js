'use strict';

var React         = require('react');
var Router        = require('react-router');
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App       = require('./components/App.jsx');
var List      = require('./components/pages/List.jsx');
var Shot      = require('./components/pages/Shot.jsx');
var Player    = require('./components/pages/Player.jsx');
var Index     = require('./components/pages/Index.jsx');
var NotFound  = require('./components/pages/NotFound.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="list" path=":id" handler={List} />
    <Route name="player" path="player/:id" handler={Player} />
    <Route name="shot" path="shot/:id" handler={Shot} />
    <DefaultRoute name="index" handler={Index} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

module.exports = routes;