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


var Item = React.createClass({

	mixins: [StoreWatchMixin],

	getData: function(props) {
		var props = props.id || props;
		var meta = AppStore.getState();

		if (props && props !== meta.id) {
			console.log('=> View => Actions :', props);
			AppActions.getShot(props);
			this.setState({ data: [] });
		}
	},

	renderPlayer: function() {
		if (typeof(this.state.data.player) !== 'undefined') {
			var player = this.state.data.player;
			return (
				<Link to="player" params={{id: player.username}}>
					<h2>{player.name}</h2>
					<img src={player.avatar_url}/>
				</Link>
			);
		}
	},

	render: function() {
		var text = this.state.liked ? 'like' : 'hate';
		var data = this.state.data;
		var id = this.props.id;

		if (data.length === 0) {
			return (<p>loading data ...</p>);
		}

		if (id == 'error') {
			return (
				<NotFound/>
			);
		}

		return (
			<div>
				<h1>{data.title}</h1>
				<img src={data.image_teaser_url} />
				<hr/>	
				{this.renderPlayer()}
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

module.exports = Item;
