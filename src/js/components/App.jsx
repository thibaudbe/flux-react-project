'use strict';

var React 				= require('react');
var AppStore 			= require('../stores/AppStore');
var AppActions    = require('../actions/AppActions');
var Header        = require('./partials/Header.jsx');
var Navbar        = require('./partials/Navbar.jsx');
var Footer        = require('./partials/Footer.jsx');
// var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var DocumentTitle	= require('react-document-title');
var Router 				= require('react-router');
var RouteHandler 	= Router.RouteHandler;
var Link 					= Router.Link;
var State         = Router.State;


var App = React.createClass({

	mixins: [Router.State],
	
	lettrine: function(str) {
		return isNaN(str) ? str.charAt(0).toUpperCase() + str.slice(1) : 'Single shot';
	},

	pageTitle: function(props) {
		var page = {
			home: {
				title: 'RRReact',
				logo: true,
			},
			everyone: {
				title: 'All last shots',
				logo: false,
			},
			debuts: {
				title: 'First shots',
				logo: false,
			},
			popular: {
				title: 'The most popular shots',
				logo: false,
			},
			shot: {
				title: 'Single shot',
				logo: false,
			},
			player: {
				title: 'Single player',
				logo: false,
			},
			error: {
				title: 'Somethings\' wrong',
				logo: false,
			}
		};

		if (props.params.id === undefined) return page.home;
		else if (props.params.id === 'everyone') return page.everyone;
		else if (props.params.id === 'debuts') return page.debuts;
		else if (props.params.id === 'popular') return page.popular;
		else if (props.path.indexOf('/shot/') > -1) return page.shot;
		else if (props.path.indexOf('/player/') > -1) return page.player;
		else return page.home;
	},

	/**
	 * @return {object}
	 */
	render: function() {
		var title = this.props.params.id ? this.lettrine(this.props.params.id) : '';

		// <TransitionGroup component="div" transitionName="example">
		// 	<RouteHandler {...this.props.params} key={name}/>
		// </TransitionGroup>
		
		return (
			<DocumentTitle title={'RRReact | '+ title || 'Untitled'}>
				<div className="wrap">
					<Navbar page={ this.pageTitle(this.props) } />
					<Header page={ this.pageTitle(this.props) } />
					<RouteHandler {...this.props.params} />
					<Footer page={ this.pageTitle(this.props) } />
				</div>
			</DocumentTitle>
		);
	}

});

module.exports = App;
