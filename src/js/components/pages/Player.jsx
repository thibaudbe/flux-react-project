'use strict';

var React          = require('react');
var AppActions     = require('../../actions/AppActions');
var AppStore       = require('../../stores/AppStore');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var DocumentTitle	 = require('react-document-title');
var Router         = require('react-router');
var RouteHandler   = Router.RouteHandler;
var Link           = Router.Link;


var Player = React.createClass({

	mixins: [StoreWatchMixin],

	getData: function(props) {
		var props = props.id || props;
		var meta = AppStore.getState();

		if (props && props !== meta.id) {
			console.log('=> View => Actions :', props);
			AppActions.getPlayer(props);
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
					</li>
				);
			});
			return shotsNode;
		}
	},

	renderPlayer: function() {
		// var shots = this.state.data.shots;
		if (typeof(this.state.data.shots) !== 'undefined') {
			var player = this.state.data.shots[0].player;
			return (
				<Link to="player" params={{id: player.username}}>
					<h2>{player.name}</h2>
					<img src={player.avatar_url}/>
				</Link>
			);
		}
	},

	render: function() {
		var data = this.state.data;

		if (data.length === 0) {
			return (<p>loading data ...</p>);
		}

		// <p><Link to="app">Back</Link></p>

		return (
			<div>
				<div>{this.renderPlayer()}</div>
				<hr/>
				<div>{this.renderShots()}</div>
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

module.exports = Player;
