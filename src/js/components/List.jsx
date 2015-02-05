'use strict';

var React          = require('react');
var AppActions     = require('../actions/AppActions');
var AppStore       = require('../stores/AppStore');
var StoreWatchMixin = require('../mixins/StoreWatchMixin');
var NotFound 			 = require('../components/NotFound.jsx');
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

	componentDidUpdate: function() {
		loadingEvents.emit('loadStart');
	},

	handleClick: function(event) {
		this.setState({
			liked: !this.state.liked
		});
	},

	renderShots: function() {
		if (typeof(this.state.data.shots) !== 'undefined') {
			var shots = this.state.data.shots;
			var shotsNode = shots.map(function(item, i) {
				return (
					<li key={i}>
						<Link to="item" params={{id: item.id}}>
							{item.title} <img width="27" height="20" src={item.image_url}/>
						</Link>
						<Link to="user" params={{id: item.player.username}}>
							{item.player.name}
						</Link>
					</li>
				);
			});
			return shotsNode;
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
			<DocumentTitle title={id || 'Untitled'}>
				<div>
					<p onClick={this.handleClick}>I {text}</p>
					<hr/>
					<p>You are on the {id} list</p>
					<hr/>
					<ul>
						{this.renderShots()}
					</ul>
				</div>
			</DocumentTitle>
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