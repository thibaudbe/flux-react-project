'use strict';

var React          = require('react');
var AppActions     = require('../../actions/AppActions');
var AppStore       = require('../../stores/AppStore');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var Loading 			 = require('../partials/Loading.jsx');
var NotFound       = require('../pages/NotFound.jsx');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var DocumentTitle	 = require('react-document-title');
var Router         = require('react-router');
var RouteHandler   = Router.RouteHandler;
var Link           = Router.Link;

var EventEmitter = require('events').EventEmitter;
var loadingEvents = new EventEmitter();


var List = React.createClass({

	mixins: [StoreWatchMixin],

	getData: function(props) {
		var props = props.id || props;
		var meta = AppStore.getState();

		if (props && props !== meta.id) {
			console.log('=> View => Actions :', props);
			AppActions.getList(props);
			this.setState({ data: [] });
		}
	},

	renderShots: function() {
		if (typeof(this.state.data.shots) !== 'undefined') {
			var shots = this.state.data.shots;
			var shotsNode = shots.map(function(shot, i) {
				return (
					<li key={i}>
						<Link to="shot" params={{id: shot.id}}>
							{shot.title} <img width="27" height="20" src={shot.image_url}/>
						</Link>
						<Link to="player" params={{id: shot.player.username}}>
							{shot.player.name}
						</Link>
					</li>
				);
			});
			return shotsNode;
		}
	},

	render: function() {
		var data = this.state.data;
		var id = this.state.id;

		var loading = data.length === 0 ? <Loading /> : '';

		if (id == 'error') {
			return (
				<NotFound/>
			);
		}

		return (
			<div>
				{loading}
				<hr/>
				<p>You are on the {id} list</p>
				<hr/>
				<ul>
					{this.renderShots()}
				</ul>
			</div>
		);
	},

	/**
	 * Update component when Store change
	 */
	_onStoreChange: function() {
		this.setState(AppStore.getState());
	}

});

module.exports = List;