'use strict';

var React         = require('react');
var Router        = require('react-router');
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App       = require('./components/App.jsx');
var List      = require('./components/List.jsx');
var Item      = require('./components/Item.jsx');
var User      = require('./components/User.jsx');
var Index     = require('./components/Index.jsx');
var NotFound  = require('./components/NotFound.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="list" path=":id" handler={List}/>
    <Route name="user" path="user/:id" handler={User}/>
    <Route name="item" path="shot/:id" handler={Item}/>
    <DefaultRoute name="index" handler={Index}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

module.exports = routes;