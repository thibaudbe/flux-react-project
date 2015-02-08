'use strict';

var React 				= require('react');
var AppStore 			= require('../stores/AppStore');
var AppActions    = require('../actions/AppActions');
// var Header        = require('./partials/Header.jsx');
// var Navbar        = require('./partials/Navbar.jsx');
// var Footer        = require('./partials/Footer.jsx');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
// var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
// var ReactTransitionGroup = React.addons.TransitionGroup;

var DocumentTitle	= require('react-document-title');
var Router 				= require('react-router');
var RouteHandler 	= Router.RouteHandler;
var Link 					= Router.Link;
var State         = Router.State;


var App = React.createClass({

	mixins: [Router.State],
	
	lettrine: function (str) {
		return isNaN(str) ? str.charAt(0).toUpperCase() + str.slice(1) : 'Single shot';
	},

	/**
	 * @return {object}
	 */
	render: function() {
		var title = this.props.params.id ? this.lettrine(this.props.params.id) : '';
		var name = this.getRoutes().reverse()[0].name;
		// var home = this.props.params.id ? this.props.params.id : null;
		// var header = this.props.params.id ? <Header title={title} /> : '';
		// var footer = this.props.params.id ? <Footer /> : '';

				// <TransitionGroup component="div" transitionName="example">
				// 	<RouteHandler {...this.props.params} key={name}/>
				// </TransitionGroup>
		return (
			<DocumentTitle title={'RRReact | '+ title || 'Untitled'}>
				<div className="wrap">
					<RouteHandler {...this.props.params} />
				</div>
			</DocumentTitle>
		);
	}

});

module.exports = App;
